# File Tree: messio-api

**Generated:** 8/26/2026, 12:23:10 AM
**Root Path:** `d:\Project\Messio\messio-api`

```
├── 📁 .codegraph
│   ├── ⚙️ .gitignore
│   └── 📄 codegraph.db
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
│   │   ├── 📁 20260724205005_add_field_sended_in_messages_table
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260725133717_rm_readed_field_in_message_table
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260725173841_update_datatype_sender
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260803164624_add_page_setting_work_space
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260816140958_add_googleauth_model
│   │   │   └── 📄 migration.sql
│   │   └── ⚙️ migration_lock.toml
│   └── 📄 schema.prisma
├── 📁 src
│   ├── 📁 common
│   │   ├── 📁 auth
│   │   │   ├── 📁 decorators
│   │   │   │   ├── 📄 current-user.decorator.ts
│   │   │   │   └── 📄 permisions.decorator.ts
│   │   │   ├── 📁 dto
│   │   │   │   ├── 📄 payload.token.dto.ts
│   │   │   │   ├── 📄 payload.token.google.dto.ts
│   │   │   │   ├── 📄 request-with-user-google.type.ts
│   │   │   │   └── 📄 request-with-user.type.ts
│   │   │   ├── 📁 guards
│   │   │   │   ├── 📄 google-auth.guard.ts
│   │   │   │   ├── 📄 jwt-auth.guard.ts
│   │   │   │   └── 📄 permission.guard.ts
│   │   │   ├── 📁 strategies
│   │   │   │   ├── 📄 google.strategy.ts
│   │   │   │   └── 📄 jwt.strategy.ts
│   │   │   ├── 📄 auth.module.ts
│   │   │   └── 📄 auth.service.ts
│   │   ├── 📁 middleware
│   │   │   └── 📄 logger.middleware.ts
│   │   └── 📁 types
│   │       └── 📄 find-or-create-result.type.ts
│   ├── 📁 generated
│   │   └── 📁 prisma
│   │       ├── 📁 internal
│   │       │   ├── 📄 class.ts
│   │       │   ├── 📄 prismaNamespace.ts
│   │       │   └── 📄 prismaNamespaceBrowser.ts
│   │       ├── 📁 models
│   │       │   ├── 📄 Customers.ts
│   │       │   ├── 📄 FaceBookPage.ts
│   │       │   ├── 📄 GoogleAuth.ts
│   │       │   ├── 📄 Messages.ts
│   │       │   ├── 📄 PageSetting.ts
│   │       │   ├── 📄 PictureUserFacebook.ts
│   │       │   ├── 📄 Rooms.ts
│   │       │   ├── 📄 User.ts
│   │       │   ├── 📄 UserAccessToken.ts
│   │       │   ├── 📄 UserFacebook.ts
│   │       │   └── 📄 WorkSpace.ts
│   │       ├── 📄 browser.ts
│   │       ├── 📄 client.ts
│   │       ├── 📄 commonInputTypes.ts
│   │       ├── 📄 enums.ts
│   │       └── 📄 models.ts
│   ├── 📁 infrastructure
│   │   ├── 📁 crypto
│   │   │   ├── 📄 crypto.module.ts
│   │   │   └── 📄 token-encryption.service.ts
│   │   ├── 📁 prisma
│   │   │   ├── 📄 prisma.module.ts
│   │   │   └── 📄 prisma.service.ts
│   │   ├── 📁 queues
│   │   │   ├── 📁 alert-email
│   │   │   │   ├── 📄 alert-email.constaints.ts
│   │   │   │   ├── 📄 alert-email.events.ts
│   │   │   │   ├── 📄 alert-email.processor.ts
│   │   │   │   └── 📄 alert-email.producer.ts
│   │   │   └── 📄 queues.module.ts
│   │   ├── 📁 redis
│   │   │   ├── 📁 pages
│   │   │   │   ├── 📁 dto
│   │   │   │   │   └── 📄 page.cache.dto.ts
│   │   │   │   ├── 📁 mappers
│   │   │   │   │   └── 📄 pagesCache.mapper.ts
│   │   │   │   └── 📄 pages.service.ts
│   │   │   ├── 📄 redis.module.ts
│   │   │   ├── 📄 redis.provider.ts
│   │   │   └── 📄 redis.service.ts
│   │   └── 📁 websocket
│   │       ├── 📄 websocket.gateway.ts
│   │       ├── 📄 websocket.module.ts
│   │       └── 📄 websocket.service.ts
│   ├── 📁 modules
│   │   ├── 📁 auth
│   │   │   ├── 📁 facebook
│   │   │   │   ├── 📄 auth.controller.ts
│   │   │   │   ├── 📄 auth.module.ts
│   │   │   │   └── 📄 auth.service.ts
│   │   │   └── 📁 google
│   │   │       ├── 📁 dto
│   │   │       ├── 📄 google.controller.ts
│   │   │       ├── 📄 google.module.ts
│   │   │       └── 📄 google.service.ts
│   │   ├── 📁 chats
│   │   │   ├── 📁 customer
│   │   │   │   ├── 📁 dto
│   │   │   │   │   ├── 📄 createCustomer.request.dto.ts
│   │   │   │   │   ├── 📄 customer.dto.ts
│   │   │   │   │   └── 📄 customerGraph.response.dto.ts
│   │   │   │   ├── 📁 repositories
│   │   │   │   │   └── 📄 useCustomer.repository.ts
│   │   │   │   ├── 📄 customer.module.ts
│   │   │   │   └── 📄 customer.service.ts
│   │   │   ├── 📁 dto
│   │   │   ├── 📁 messages
│   │   │   │   ├── 📁 dto
│   │   │   │   │   └── 📄 create-message.request.dto.ts
│   │   │   │   ├── 📁 repositories
│   │   │   │   │   └── 📄 useMessages.repository.ts
│   │   │   │   ├── 📄 messages.module.ts
│   │   │   │   └── 📄 messages.service.ts
│   │   │   ├── 📁 rooms
│   │   │   │   ├── 📁 dto
│   │   │   │   ├── 📁 repositories
│   │   │   │   │   └── 📄 useRoom.repository.ts
│   │   │   │   ├── 📄 rooms.module.ts
│   │   │   │   └── 📄 rooms.service.ts
│   │   │   ├── 📄 chats.controller.ts
│   │   │   ├── 📄 chats.module.ts
│   │   │   └── 📄 chats.service.ts
│   │   ├── 📁 pages
│   │   │   ├── 📁 dto
│   │   │   │   ├── 📄 createPage.response.ts
│   │   │   │   ├── 📄 list-page-register.schema.ts
│   │   │   │   └── 📄 pageDb.dto.ts
│   │   │   ├── 📁 repositories
│   │   │   │   ├── 📄 usePage.repository.ts
│   │   │   │   └── 📄 userAccessToken.repository.ts
│   │   │   ├── 📁 setting
│   │   │   │   ├── 📁 dto
│   │   │   │   │   └── 📄 create-setting.request.ts
│   │   │   │   ├── 📁 repositories
│   │   │   │   │   └── 📄 setting.repository.ts
│   │   │   │   ├── 📄 setting.module.ts
│   │   │   │   └── 📄 setting.service.ts
│   │   │   ├── 📁 work-space
│   │   │   │   ├── 📁 dto
│   │   │   │   │   └── 📄 list-users-assign.schema.ts
│   │   │   │   ├── 📁 repositories
│   │   │   │   │   └── 📄 useWorkSpace.repository.ts
│   │   │   │   ├── 📄 work-space.module.ts
│   │   │   │   ├── 📄 work-space.service.spec.ts
│   │   │   │   └── 📄 work-space.service.ts
│   │   │   ├── 📄 pages.controller.ts
│   │   │   ├── 📄 pages.mapper.ts
│   │   │   ├── 📄 pages.module.ts
│   │   │   └── 📄 pages.service.ts
│   │   ├── 📁 users
│   │   │   ├── 📁 dto
│   │   │   │   ├── 📄 createUserDto.ts
│   │   │   │   ├── 📄 createUserFacebookDto.ts
│   │   │   │   └── 📄 createUserGoogle.dto.ts
│   │   │   ├── 📁 repositories
│   │   │   │   └── 📄 useUser.repository.ts
│   │   │   ├── 📁 services
│   │   │   └── 📄 users.module.ts
│   │   └── 📁 webhooks
│   │       ├── 📁 meta
│   │       │   ├── 📁 dto
│   │       │   │   ├── 📄 message.create.dto.ts
│   │       │   │   ├── 📄 useRoom.repository.ts
│   │       │   │   ├── 📄 webhook-verification.request.dto.ts
│   │       │   │   └── 📄 webhooks.messages.response.ts
│   │       │   ├── 📁 repositories
│   │       │   │   └── 📄 useMessages.repository.ts
│   │       │   ├── 📄 meta.controller.ts
│   │       │   ├── 📄 meta.module.ts
│   │       │   └── 📄 meta.service.ts
│   │       └── 📄 webhooks.module.ts
│   ├── 📁 providers
│   │   └── 📁 facebook
│   │       ├── 📁 clients
│   │       │   └── 📄 facebook-graph.client.ts
│   │       ├── 📁 dto
│   │       │   ├── 📄 me.graph.response.ts
│   │       │   ├── 📄 oauth-access-token.graph.response.ts
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
├── ⚙️ client_secret_313711622415-r6ob49vvi0ics8khbdoh2jab32vq72sp.apps.googleusercontent.com (1).json
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