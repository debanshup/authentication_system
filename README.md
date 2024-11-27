This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install all the required dependencies

```bash
npm install
```

Create a .env with the following details in the root of your project

```bash
MONGO_URI="YOUR MONGO URI"
TOKEN_SECRET="TOKEN SECRET"
DOMAIN=http://localhost:3000/ # YOU CAN CHANGE IT
# OTHER VARIABLES IF APPLICABLE



```

Run local development server

```bash
npm run dev
```

## Email Functionality

---

This project uses the [SMTP_SERVER](https://github.com/debanshup/SMTP_SERVER) to send emails. The email functionality has been implemented in the `src/helper/mailer.ts`.

For more details about the SMTP server, refer to the official repository: [SMTP_SERVER on GitHub](https://github.com/debanshup/SMTP_SERVER).

Alternatively, you can implement your own email sender if preferred.

---

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

---

## Contribution

Contributions are welcome! Feel free to submit a Pull Request. See the [CONTRIBUTING](CONTRIBUTING.md) section for more details.

---

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software in accordance with the terms of the license.

---
