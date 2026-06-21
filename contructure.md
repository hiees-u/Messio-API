# File Tree: messio-api

**Generated:** 6/21/2026, 12:19:15 PM
**Root Path:** `d:\Project\Messio\messio-api`

```
├── 📁 prisma
│   ├── 📁 migrations
│   │   ├── 📁 0000_init
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260429231307_add_facebook_models
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260430051727_update_field_picture_user_face_book_table
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260430100841_update_type_field_picture_user_facebook_table
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260502103125_add_user_access_token_table
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260508210021_add_facebook_page_table
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260510060257_add_facebook_page_table
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260605150859_add_customers_rooms_messages_table
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260605160708_add_unique_page_id_customer_id
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260605163241_add_field_text_type_in_table_messages
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260605164142_add_field_option_text_type_in_table_messages
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260605202719_add_field_tasks_in_facebook_page_table
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260607060930_room_relate_in_customer_table
│   │   │   └── 📄 migration.sql
│   │   └── ⚙️ migration_lock.toml
│   └── 📄 schema.prisma
├── 📁 src
│   ├── 📁 common
│   │   ├── 📁 auth
│   │   │   ├── 📁 decorators
│   │   │   │   └── 📄 current-user.decorator.ts
│   │   │   ├── 📁 dto
│   │   │   │   ├── 📄 payload.token.dto.ts
│   │   │   │   └── 📄 request-with-user.type.ts
│   │   │   ├── 📁 guards
│   │   │   │   └── 📄 jwt-auth.guard.ts
│   │   │   ├── 📁 strategies
│   │   │   │   └── 📄 jwt.strategy.ts
│   │   │   ├── 📄 auth.module.ts
│   │   │   ├── 📄 auth.service.spec.ts
│   │   │   └── 📄 auth.service.ts
│   │   └── 📁 middleware
│   │       └── 📄 logger.middleware.ts
│   ├── 📁 generated
│   ├── 📁 infrastructure
│   │   ├── 📁 crypto
│   │   │   ├── 📄 crypto.module.ts
│   │   │   └── 📄 token-encryption.service.ts
│   │   ├── 📁 prisma
│   │   │   ├── 📄 prisma.module.ts
│   │   │   └── 📄 prisma.service.ts
│   │   └── 📁 redis
│   │       ├── 📁 pages
│   │       │   ├── 📁 dto
│   │       │   │   └── 📄 page.cache.dto.ts
│   │       │   ├── 📁 mappers
│   │       │   │   └── 📄 pagesCache.mapper.ts
│   │       │   ├── 📄 pages.service.spec.ts
│   │       │   └── 📄 pages.service.ts
│   │       ├── 📄 redis.module.ts
│   │       ├── 📄 redis.provider.ts
│   │       ├── 📄 redis.service.spec.ts
│   │       └── 📄 redis.service.ts
│   ├── 📁 modules
│   │   ├── 📁 auth
│   │   │   ├── 📄 auth.controller.spec.ts
│   │   │   ├── 📄 auth.controller.ts
│   │   │   ├── 📄 auth.module.ts
│   │   │   ├── 📄 auth.service.spec.ts
│   │   │   └── 📄 auth.service.ts
│   │   ├── 📁 chats
│   │   │   ├── 📄 chats.module.ts
│   │   │   ├── 📄 chats.service.spec.ts
│   │   │   └── 📄 chats.service.ts
│   │   ├── 📁 customer
│   │   │   ├── 📁 dto
│   │   │   │   ├── 📄 createCustomer.request.dto.ts
│   │   │   │   ├── 📄 customer.dto.ts
│   │   │   │   └── 📄 customerGraph.response.dto.ts
│   │   │   ├── 📁 repositories
│   │   │   │   └── 📄 useCustomer.repository.ts
│   │   │   ├── 📄 customer.module.ts
│   │   │   ├── 📄 customer.service.spec.ts
│   │   │   └── 📄 customer.service.ts
│   │   ├── 📁 pages
│   │   │   ├── 📁 dto
│   │   │   │   └── 📄 pageDb.dto.ts
│   │   │   ├── 📁 repositories
│   │   │   │   ├── 📄 usePage.repository.ts
│   │   │   │   └── 📄 userAccessToken.repository.ts
│   │   │   ├── 📄 pages.controller.spec.ts
│   │   │   ├── 📄 pages.controller.ts
│   │   │   ├── 📄 pages.module.ts
│   │   │   ├── 📄 pages.service.spec.ts
│   │   │   └── 📄 pages.service.ts
│   │   ├── 📁 users
│   │   │   ├── 📁 dto
│   │   │   │   ├── 📄 createUserDto.ts
│   │   │   │   └── 📄 createUserFacebookDto.ts
│   │   │   ├── 📁 repositories
│   │   │   │   └── 📄 useUser.repository.ts
│   │   │   └── 📁 services
│   │   └── 📁 webhooks
│   │       ├── 📁 meta
│   │       │   ├── 📁 dto
│   │       │   │   ├── 📄 message.create.dto.ts
│   │       │   │   ├── 📄 useRoom.repository.ts
│   │       │   │   ├── 📄 webhook-verification.request.dto.ts
│   │       │   │   └── 📄 webhooks.messages.response.ts
│   │       │   ├── 📁 repositories
│   │       │   │   └── 📄 useMessages.repository.ts
│   │       │   ├── 📄 meta.controller.spec.ts
│   │       │   ├── 📄 meta.controller.ts
│   │       │   ├── 📄 meta.module.ts
│   │       │   ├── 📄 meta.service.spec.ts
│   │       │   └── 📄 meta.service.ts
│   │       └── 📄 webhooks.module.ts
│   ├── 📁 providers
│   │   └── 📁 facebook
│   │       ├── 📁 clients
│   │       │   └── 📄 facebook-graph.client.ts
│   │       ├── 📁 dto
│   │       │   ├── 📄 me.graph.response.ts
│   │       │   ├── 📄 oauth-access-token.graph.response.ts
│   │       │   ├── 📄 page-subscribed.request.ts
│   │       │   ├── 📄 page-subscribed.response.ts
│   │       │   └── 📄 pages.graph.response.ts
│   │       ├── 📁 services
│   │       │   ├── 📄 customer-api.service.ts
│   │       │   ├── 📄 facebook-page-api.service.ts
│   │       │   └── 📄 facebook-user-api.service.ts
│   │       └── 📄 facebook.module.ts
│   ├── 📄 app.module.ts
│   ├── 📄 main.ts
│   └── ⚙️ note.json
├── 📁 test
│   ├── 📄 app.e2e-spec.ts
│   └── ⚙️ jest-e2e.json
├── ⚙️ .gitignore
├── ⚙️ .prettierrc
├── 📝 README.md
├── 📝 contructure.md
├── 📄 eslint.config.mjs
├── ⚙️ nest-cli.json
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 prisma.config.ts
└── ⚙️ tsconfig.json
```

---
*Generated by FileTree Pro Extension*