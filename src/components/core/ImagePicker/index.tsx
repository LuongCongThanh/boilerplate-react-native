import React, {useRef} from 'react'
import {useCallback} from 'react'
import ActionSheet, {ActionSheetProps} from 'react-native-actionsheet'
import ImagePicker, {
  ImageOrVideo,
  Options
} from 'react-native-image-crop-picker'
import IconButton, {Props as ButtonProps} from '../IconButton'

export type Props = Partial<ButtonProps> & {
  actionSheetProps?: Partial<ActionSheetProps>
  onSelected?: (data: ImageOrVideo) => void
  onError?: (error: unknown) => void
  options?: Options
}

export enum ImagePickerOption {
  Cancel = 0,
  OpenCamera = 1,
  PickFromGallery = 2
}

const DEFAULT_OPTIONS = ['Cancel', 'Open Camera', 'Select from gallery']
const DEFAULT_TITLE = 'Image picker'
const DEFAULT_MESSAGE = 'Please choose one option'

const ImagePickerComponent = ({
  actionSheetProps,
  onSelected,
  onError,
  options = {cropping: true},
  name = 'pencil',
  ...rest
}: Props) => {
  const actionSheetRef = useRef<ActionSheet>(null)

  const showActionSheet = () => {
    actionSheetRef.current?.show()
  }

  const handleLaunchCamera = useCallback(async () => {
    try {
      const result = await ImagePicker.openCamera(options)
      onSelected?.(result)
    } catch (error) {
      onError?.(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const handleImagePicker = useCallback(async () => {
    try {
      const result = await ImagePicker.openPicker(options)
      onSelected?.(result)
    } catch (error) {
      onError?.(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const handlePressOption = useCallback(
    (index: number) => {
      switch (index) {
        case ImagePickerOption.OpenCamera:
          handleLaunchCamera()
          break

        case ImagePickerOption.PickFromGallery:
          handleImagePicker()
          break
      }
    },
    [handleImagePicker, handleLaunchCamera]
  )

  return (
    <>
      <IconButton name={name} onPress={showActionSheet} {...rest} />
      <ActionSheet
        ref={actionSheetRef}
        title={DEFAULT_TITLE}
        message={DEFAULT_MESSAGE}
        options={DEFAULT_OPTIONS}
        cancelButtonIndex={ImagePickerOption.Cancel}
        onPress={handlePressOption}
        {...actionSheetProps}
      />
    </>
  )
}

export default ImagePickerComponent
