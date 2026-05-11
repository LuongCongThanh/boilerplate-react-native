# Issue tracker: GitHub

Issues và PRDs cho repo này nằm trên GitHub Issues. Dùng `gh` CLI cho tất cả các thao tác.

## Conventions

- **Tạo issue**: `gh issue create --title "..." --body "..."`. Dùng heredoc cho nội dung nhiều dòng.
- **Xem issue**: `gh issue view <number> --comments`, lọc comments bằng `jq` và lấy cả labels.
- **Liệt kê issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` với `--label` và `--state` phù hợp.
- **Comment vào issue**: `gh issue comment <number> --body "..."`
- **Thêm / xóa label**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Đóng issue**: `gh issue close <number> --comment "..."`

Repo: `LuongCongThanh/boilerplate-react-native` — `gh` tự nhận khi chạy trong thư mục clone.

## Khi skill nói "publish to the issue tracker"

Tạo một GitHub issue.

## Khi skill nói "fetch the relevant ticket"

Chạy `gh issue view <number> --comments`.
