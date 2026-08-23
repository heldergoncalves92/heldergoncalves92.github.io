export interface HomelabDecision {
  title: string;
  description: string;
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
    'A family-facing private cloud on a NAS: photos, files, media, and monitoring — all self-hosted, HTTPS everywhere, and rebuildable from this repo.',
  decisions: [
    {
      title: 'No inbound ports',
      description:
        'All external traffic enters via Cloudflare Tunnel. Every service here is published outbound-only; none of them needs a forwarded port or a public IP.',
    },
    {
      title: 'One hostname everywhere',
      description:
        'Public DNS resolves to Cloudflare; Pi-hole local rewrites map the same names to internal IPs on the LAN. Same URLs, TLS, and auth — at home or away.',
    },
    {
      title: 'Auth at the edge',
      description:
        'Cloudflare Access enforces SSO/OAuth for humans; service tokens and mTLS for machines. Origins additionally validate Cloudflare’s signed JWT / client cert.',
    },
    {
      title: 'Layered monitoring',
      description:
        'Uptime Kuma (liveness), Beszel (resources), Better Stack (public path + deadman heartbeat) — all alerts converge on self-hosted ntfy.',
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
    { name: 'Cloudflare Tunnel', purpose: 'Outbound-only ingress, Access, mTLS' },
    { name: 'Nginx Proxy Manager', purpose: 'TLS termination and per-host routing' },
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
