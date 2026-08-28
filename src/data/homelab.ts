export interface HomelabDecision {
  title: string;
  description: string;
  /** Optional outbound proof for the claim — rendered under the description. */
  evidence?: { label: string; href: string };
}

export interface HomelabStackItem {
  name: string;
  purpose: string;
}

export interface HomelabCta {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
}

export interface HomelabPageData {
  title: string;
  thesis: string;
  intro: string;
  decisions: HomelabDecision[];
  stack: HomelabStackItem[];
  ctas: HomelabCta[];
  meta: {
    title: string;
    description: string;
    canonical: string;
    /** Absolute URL of the 1200x630 social card for this page. */
    image: string;
    /** ISO date the page first went live. Feeds TechArticle.datePublished. */
    datePublished: string;
  };
}

export const homelab: HomelabPageData = {
  title: 'Self-Hosted Home Lab',
  thesis: 'NAS private cloud — no inbound ports, zero-trust at the edge, declarative and versioned in Git.',
  intro:
    'A family-facing private cloud on a NAS: photos, files, media, and monitoring — all self-hosted, HTTPS everywhere, and declared as code, so every stack redeploys onto fresh hardware straight from this repo.',
  decisions: [
    {
      title: 'No inbound ports',
      description:
        'All external traffic enters via Cloudflare Tunnel, and the Tailscale VPN dials out the same way. Every service here is published outbound-only; none of them needs a forwarded port or a public IP.',
    },
    {
      title: 'One hostname everywhere',
      description:
        'Public DNS resolves to Cloudflare; Pi-hole rewrites map the same names to internal IPs for LAN and VPN clients alike. Either way the request hits the same reverse proxy — same URLs, same TLS, same auth, one bookmark.',
    },
    {
      title: 'Auth at the edge',
      description:
        'Cloudflare Access enforces SSO/OAuth for humans; service tokens and mTLS for machines. Origins additionally validate Cloudflare’s signed JWT / client cert.',
    },
    {
      title: 'Least privilege on the VPN',
      description:
        'Cloudflare’s free plan caps proxied uploads at 100 MB, and phone photo backups need a path without that ceiling. Tailscale ACLs open only Pi-hole and the reverse proxy to family devices — plus Dockge for admin — so the VPN still ends at the same per-host access lists.',
    },
    {
      title: 'Layered monitoring',
      description:
        'Uptime Kuma covers container and HTTP liveness, Beszel covers resources, and Better Stack probes the public path from outside. Alerts converge on self-hosted ntfy — and Better Stack also expects a heartbeat on a schedule, so a lab that goes dark entirely, ntfy included, still raises an alarm: the missing heartbeat is the alert.',
      evidence: { label: 'Live status page', href: 'https://status.hgoncalves.uk' },
    },
    {
      title: 'Secrets stay out of Git',
      description:
        'Every stack is compose-as-code with `.env.example` templates. Runtime secrets live only in ignored env files; config is reproducible, credentials are not.',
    },
  ],
  stack: [
    { name: 'Immich', purpose: 'Photo / video library and phone backup' },
    { name: 'OpenCloud', purpose: 'File sync and collaboration' },
    { name: 'Plex / Plexamp', purpose: 'Media (runs on the NAS; not in the repo)' },
    { name: 'Home Assistant', purpose: 'Home automation' },
    { name: 'Cloudflare Tunnel', purpose: 'Outbound-only ingress, Access, mTLS' },
    { name: 'Tailscale', purpose: 'ACL-scoped VPN for uncapped uploads and admin' },
    { name: 'Nginx Proxy Manager', purpose: 'TLS termination, per-host routing and access lists' },
    { name: 'Pi-hole', purpose: 'DNS, ad blocking, LAN hostname rewrites' },
    { name: 'Dockge', purpose: 'Compose stack manager' },
    { name: 'Uptime Kuma', purpose: 'Container and HTTP liveness probes' },
    { name: 'Beszel', purpose: 'CPU, RAM, disk, temperature metrics' },
    { name: 'ntfy', purpose: 'Push alert sink for every monitoring layer' },
  ],
  ctas: [
    {
      label: 'View on GitHub',
      href: 'https://github.com/helderjgoncalves/Homelab-Infrastructure',
      external: true,
      primary: true,
    },
    {
      label: 'Public status page',
      href: 'https://status.hgoncalves.uk',
      external: true,
    },
  ],
  meta: {
    title: 'Self-Hosted Home Lab · Hélder Gonçalves',
    description:
      'Case study of a NAS-based private cloud: Cloudflare Tunnel, zero-trust Access, Pi-hole, Immich, OpenCloud, and layered monitoring — all declarative in Git.',
    canonical: 'https://hgoncalves.uk/homelab/',
    image: 'https://hgoncalves.uk/og-homelab.png',
    datePublished: '2026-08-10',
  },
};
