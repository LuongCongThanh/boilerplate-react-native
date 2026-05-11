# Domain Docs

Hướng dẫn các engineering skills cách đọc tài liệu domain của repo khi khám phá codebase.

## Đọc trước khi khám phá

- **`CONTEXT.md`** tại thư mục gốc — ngữ cảnh và thuật ngữ domain của dự án
- **`docs/adr/`** — đọc các ADR liên quan đến khu vực bạn sắp làm việc

Nếu các file này chưa tồn tại, **tiếp tục im lặng**. Đừng báo lỗi; đừng đề xuất tạo ngay. File `CONTEXT.md` và ADR được tạo dần khi cần thiết.

## Cấu trúc file

Repo này dùng **single-context** (một ngữ cảnh duy nhất):

```
/
├── CONTEXT.md
├── docs/
│   ├── agents/          ← cấu hình cho engineering skills
│   └── adr/             ← architectural decision records
│       ├── 0001-*.md
│       └── 0002-*.md
└── src/
```

## Dùng đúng thuật ngữ trong glossary

Khi output đặt tên cho một khái niệm domain (trong tiêu đề issue, đề xuất refactor, tên test), dùng thuật ngữ như đã định nghĩa trong `CONTEXT.md`. Không dùng từ đồng nghĩa mà glossary đã loại trừ.

Nếu khái niệm bạn cần chưa có trong glossary — đó là tín hiệu: hoặc bạn đang tạo ra ngôn ngữ mới (xem lại), hoặc có lỗ hổng thực sự (ghi chú để bổ sung sau).

## Đánh dấu khi mâu thuẫn với ADR

Nếu output của bạn mâu thuẫn với một ADR hiện có, nêu rõ thay vì im lặng ghi đè:

> _Mâu thuẫn với ADR-000X — nhưng đáng xem xét lại vì…_
