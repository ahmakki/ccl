export async function handler() {
  try {
    const token = process.env.NETLIFY_ACCESS_TOKEN;
    const siteId = process.env.NETLIFY_SITE_ID;

    if (!token || !siteId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Missing NETLIFY_ACCESS_TOKEN or NETLIFY_SITE_ID environment variables."
        })
      };
    }

    // Netlify API: list submissions for the site
    // Docs: https://docs.netlify.com/api/get-started/
    const url = `https://api.netlify.com/api/v1/sites/${siteId}/submissions`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        statusCode: res.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Failed to fetch submissions", details: text })
      };
    }

    const submissions = await res.json();

    // Filter only donation form submissions
    const donationSubs = (submissions || []).filter((s) => {
      const formName = s?.form_name || s?.form?.name || s?.data?.["form-name"];
      return formName === "donation";
    });

    const count = donationSubs.length;
    const total = donationSubs.reduce((sum, s) => {
      const amt = Number(s?.data?.amount ?? 0);
      return sum + (Number.isFinite(amt) ? amt : 0);
    }, 0);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        // Optional cache for 30 seconds
        "Cache-Control": "public, max-age=30"
      },
      body: JSON.stringify({ count, total: Math.round(total * 100) / 100 })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: String(e) })
    };
  }
}
