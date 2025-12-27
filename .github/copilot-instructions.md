## 快速指南 — 给 AI 代码代理的要点

下面是让 AI 代码代理在本仓库中能立即产出的关键信息。尽量把修改限制在可验证的小范围（单元/构建通过），并优先查看列出的文件以确认上下文。

- 大体架构：这是一个 pnpm/turbo 的 monorepo。顶层由 `pnpm-workspace.yaml` 管理工作区（`apps/*`, `packages/*`），构建/并行任务由 `turbo.json` 控制。示例：`apps/web` 是一个 Next.js 应用，`packages/scenery-ui`、`packages/utils`、`packages/scenery-hooks` 为内部包。

- 重要文件（先看这些）：
  - `package.json`（仓库根）——脚本：`build`/`dev`/`test` 都使用 `turbo run ...`。
  - `turbo.json` —— pipeline 定义、全局 env（如 `NEXT_PUBLIC_API_URL`）和 outputs。修改任务前务必查看这里的 `pipeline`。
  - `pnpm-workspace.yaml` —— workspaces 列表（apps, packages）。
  - `packages/*/package.json` —— 本地包通常把源码放在 `src/`，并通过 `exports`/`main` 指向 `src`。示例：`packages/scenery-ui/package.json`。
  - `.changeset/` 与根 `package.json` 的 changesets 脚本（`cs`, `cs:v`, `cs:p`）——发布流程依赖 changesets。
  - `apps/web/package.json` —— Next.js 应用示例，依赖内部包以 `workspace:*` 或 `workspace:^` 引入。

- 运行与调试（可复制的例子）
  - 本地安装并启动所有 workspaces（在 monorepo 根）：
    ```bash
    pnpm install
    pnpm run dev   # 等价于 `turbo run dev`，将并发启动有 dev 脚本的包
    ```
  - 单独启动 web 应用：
    ```bash
    cd apps/web
    pnpm install
    pnpm run dev
    ```
  - 构建/测试（根级别，会调用 turbo）：
    ```bash
    pnpm run build
    pnpm run test
    ```

- 项目约定与常见模式（可直接引用示例）
  - 内部包的源码位于 `packages/<name>/src/`，主导出通常在 `src/index.tsx`。示例：`packages/scenery-ui/src/index.tsx` 导出 `Button`。
  - 包的 `package.json` 使用 `exports` 以支持子路径导入（例如 `@scenery/ui` 的 `./button` 与 `./styles.css`）。修改导出时，记得同步 `files` 与 `types` 字段。
  - 应用依赖内部包通过 `workspace:*`（apps/web 的依赖）。当改动内部包接口时，要同时检查依赖方（apps/web）是否需要更新或重建。

- 发布与变更集（changesets）
  - 使用根脚本管理版本和发布：`pnpm run cs`（交互）、`pnpm run cs:v`（生成版本）、`pnpm run cs:p`（发布）。.changeset 目录用于存储变更说明。

- 环境/安全注意
  - `turbo.json` 声明了 `globalEnv`（示例 `DATABASE_URL`, `API_KEY`）和 `globalDependencies`，在做可重复构建或远程缓存时需注意不提交敏感值。
  - Husky 已启用（`prepare` 脚本），提交钩子可能存在；对提交相关改动请查看 `.husky/`（如存在）。

- 编辑/贡献小贴士（AI 应遵循的策略）
  - 优先在受影响最小的包中实现变更并在本地构建通过（`pnpm run build` / `pnpm run test`）。
  - 更改导出的类型或路径时，更新依赖方的导入并运行 `turbo run build` 以捕捉跨包影响。
  - 对 UI 组件的改动：遵循 `packages/scenery-ui/src` 的实现模式（函数组件、`export { Button }`），并确保样式文件（如 `styles.css`）通过 `exports` 暴露时路径一致。

如果你希望我把这份说明扩展为英文版本、添加 CI/CD（例如 GitHub Actions）指令，或把示例命令改为 npm/yarn 的等价命令，请告知我想要优先覆盖的区域。
