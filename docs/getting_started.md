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

## 🌈 Advanced: High-Fidelity Local Environment

To enable full **Cloudflare Web Analytics** and **PWA features** (Service Workers) during development, you must mirror the production environment.

### 1. DNS Spoofing (Local Hostname)
Map the production-like domain to your local machine by adding this to your `/etc/hosts` file (or `C:\Windows\System32\drivers\etc\hosts` on Windows):
```text
127.0.0.1  dev.sendoomi.com
```

### 2. Port Parity (Standard HTTPS)
To resolve CORS issues and match production behavior, run the dev server on port **443**. This requires administrative privileges:
```bash
sudo npm run dev
```

### 3. Trust the Local SSL CA
We use a project-relative SSL store for consistency. To get the "Green Lock" and enable PWA features, import our local Certificate Authority into your browser:
1. Open your browser's **Certificate Manager** (e.g., Firefox: Settings > Privacy & Security > View Certificates).
2. In the **Authorities** tab, click **Import...**.
3. Select **`./.devcerts/rootCA.pem`** from the project root.
4. Check **"Trust this CA to identify websites"** and restart your browser.

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

## 🌐 Cloudflare Setup Runbook
To support Sendoomi's [**Subdomain Architecture**](./workflow.md), you must establish two independent projects in your Cloudflare Dashboard.

### 1. Create the Pages Projects
Go to **Workers & Pages > Create application > Pages > Connect to Git** and create two separate projects bound to this repository:
- **`sendoomi-app`**: Set the **Build Command** to `npm run build:app` and the **Output Directory** to `dist/app`.

### 2. Bind Deployment Secrets (GitHub)
In your GitHub Repository settings, add the following **Actions Secrets**:
- **`CLOUDFLARE_API_TOKEN`**: Created at [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens).
- **`CLOUDFLARE_ACCOUNT_ID`**: Found in your Cloudflare URL.

### 3. Bind Web Analytics (Privacy First)
1. Go to **Web Analytics** in the Cloudflare Dashboard.
2. Add a site (or use an existing one) to get your **JS Snippet**.
3. Identify the `token` value in the snippet (e.g., `"token": "abc123..."`).
4. Add this as a **GitHub Secret** named [**`VITE_CF_BEACON_TOKEN`**](../.env.example). Our build pipeline will automatically inject this into the production HTML.

## 🏗 Developing "Feedback First"
Before making any changes, please read our [**Workflow Guide**](./workflow.md) and our latest [**Planning Document**](./planning/issue_001_zero_day_pipeline.md) to understand our **RED-GREEN-REFACTOR** and **Iteration** standards.
