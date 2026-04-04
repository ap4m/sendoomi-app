# Getting Started: Sendoomi

Follow these steps to establish a high-fidelity development environment for Sendoomi.

## 🛠 Prerequisites
- **Node.js:** v20.0.0 or later (v24 recommended for CI/CD parity).
- **npm:** v10.0.0 or later.
- **Git:** For version control and branch management.

## 🚀 Quick Start (Local Development)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ap4m/sendoomi-app.git
   cd sendoomi-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Launch the Choice Engine (App):**
   ```bash
   npm run dev
   ```
   *This will open the React application shell at [http://localhost:5173/app/](http://localhost:5173/app/).*

4. **Launch the Marketing Site (Optional):**
   ```bash
   npm run dev:www
   ```

## 🔍 Local Preview (Wrangler)
To verify your build on a production-grade Cloudflare runtime:

1. **Build the Project:**
   ```bash
   npm run build
   ```

2. **Run the Wrangler Preview:**
   ```bash
   npm run preview
   ```
   *This uses `wrangler pages dev` to provide 100% environment fidelity.*

## 🧪 Testing
Run our suite of smoke tests and domain logic checks:
```bash
npm test
```

## 🔒 CI/CD & Secrets
To enable automated [**Cloudflare Previews**](./adr/002_move_to_cloudflare_pages.md) for every branch, you must configure the following **GitHub Secrets** in your repository:

1. **`CLOUDFLARE_API_TOKEN`**: Create this at [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) using the 'Edit Cloudflare Pages' template.
2. **`CLOUDFLARE_ACCOUNT_ID`**: Found in your Cloudflare Dashboard URL or the 'Overview' sidebar.

## 🏗 Developing "Feedback First"
Before making any changes, please read our [**Workflow Guide**](./workflow.md) and our latest [**Planning Document**](./planning/issue_001_zero_day_pipeline.md) to understand our **RED-GREEN-REFACTOR** and **Iteration** standards.
