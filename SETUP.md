# Airexchange.org V2

Public customer page:
https://airexchange.org/

Admin:
https://airexchange.org/admin/

Features:
- Customer signup: name + phone number
- Admin view of submitted signups
- Separate WhatsApp support
- General WhatsApp contact
- Our Sites section
- Upload banners/posters
- Publish/hide posters

IMPORTANT PRODUCTION NOTE:
This version demonstrates the complete interface, but localStorage is used for data. That means signup records and dashboard changes are stored in the browser and are NOT a secure shared database.

For real deployment, use:
- Authentication for /admin
- Supabase (or Firebase) database for leads/settings
- Supabase Storage (or Cloudinary) for posters
- Customer page reading published records from the database

Do not collect customer data with this prototype in production until the backend/authentication is added.

Suggested hosting:
Cloudflare Pages, Vercel, or Netlify.

Domain:
Connect airexchange.org to the hosting provider and point the domain to the deployed site.
