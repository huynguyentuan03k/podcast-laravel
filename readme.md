1 . use zod to:

1.1 call api

1.2 form validation (Client-side)

1.3 Data Transformation & Refine

1.4 Create JSON Schema, OpenAPI Docs

1.5 Zod không thực hiện HTTP: Bạn vẫn dùng fetch / Inertia / axios / router.put… để gọi API. Zod chỉ đảm nhận phần nội dung (payload) bạn gửi hoặc nhận.

1.6 Giữ DRY: Dùng một schema duy nhất cho cả client & server, tránh duplicate type/interface và lệch lạc khi codebase lớn Reddit

1.7 Feedback tức thì: Lỗi validate được báo rõ ràng, tránh phải debug khi data format sai mới phát hiện ở DB hay production.

2 . use innertia

3 . use Prettier to format code
