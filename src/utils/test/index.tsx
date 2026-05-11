import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {ReactTestRendererJSON} from 'react-test-renderer'
import {RootState} from 'src/store'

/**
 * backward compatibility for "baseElement" prop because it is deleted in the latest @testing-library/react-native
 */
const customRender = (ui: React.ReactElement, options: Record<string, unknown> = {}) => {
  const renderProp = render(ui, {...options})

  return new Proxy(renderProp, {
    get: (obj, name, receiver) => {
      // only call toJSON if baseElement is accessed
      if (name === 'baseElement') {
        return obj.toJSON()
      }
      return Reflect.get(obj, name, receiver)
    }
  }) as RenderAPI & {baseElement: ReactTestRendererJSON | null}
}

// re export
export * from '@testing-library/react-native'

/**
 * testing-library custom "render" with redux provider and paper provider
 * @param elements
 * @param store
 */
export const renderWithStore = (
  ui: any,
  state: Partial<RootState>,
  options = {}
) => {
  const mockStore = configureMockStore([thunk])

  const customProviders = ({children}: {children: JSX.Element}) => {
    const store = mockStore(state)
    if (typeof state === 'function') {
      store.dispatch({type: ''}) // to have all of the initial state of the reducers
    }
    return <Provider store={store}>{children}</Provider>
  }

  return render(ui, {wrapper: customProviders, ...options})
}

// override render of testing-library
export {customRender as render}
