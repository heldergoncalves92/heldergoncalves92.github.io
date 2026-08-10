/** Architecture overview as an accessible SVG (mirrors the Homelab README diagram). */
export function HomelabArchitecture() {
  return (
    <figure className="homelab-arch">
      <svg
        className="homelab-arch__svg"
        viewBox="0 0 720 420"
        role="img"
        aria-labelledby="homelab-arch-title homelab-arch-desc"
      >
        <title id="homelab-arch-title">Homelab architecture</title>
        <desc id="homelab-arch-desc">
          Internet traffic reaches Cloudflare edge for DNS, WAF, TLS, and Access, then enters the
          homelab through a Cloudflare Tunnel to a reverse proxy that routes to self-hosted
          services. Pi-hole, Dockge, and monitoring run alongside on the NAS.
        </desc>

        {/* Internet */}
        <rect className="homelab-arch__box homelab-arch__box--edge" x="260" y="8" width="200" height="40" rx="8" />
        <text className="homelab-arch__label" x="360" y="33" textAnchor="middle">
          Internet
        </text>

        <line className="homelab-arch__line" x1="360" y1="48" x2="360" y2="72" />
        <text className="homelab-arch__caption" x="372" y="66">
          HTTPS only
        </text>

        {/* Cloudflare */}
        <rect className="homelab-arch__box homelab-arch__box--cf" x="200" y="72" width="320" height="72" rx="8" />
        <text className="homelab-arch__label" x="360" y="96" textAnchor="middle">
          Cloudflare (Edge)
        </text>
        <text className="homelab-arch__sub" x="360" y="116" textAnchor="middle">
          DNS · WAF / TLS · Access (OAuth / SSO)
        </text>
        <text className="homelab-arch__sub" x="360" y="132" textAnchor="middle">
          mTLS · service tokens
        </text>

        <line className="homelab-arch__line" x1="360" y1="144" x2="360" y2="176" />
        <text className="homelab-arch__caption" x="372" y="168">
          Cloudflare Tunnel
        </text>

        {/* Homelab boundary */}
        <rect className="homelab-arch__boundary" x="24" y="176" width="672" height="228" rx="12" />
        <text className="homelab-arch__boundary-label" x="44" y="198">
          Homelab (NAS)
        </text>

        {/* cloudflared → proxy → services */}
        <rect className="homelab-arch__box" x="48" y="216" width="140" height="56" rx="8" />
        <text className="homelab-arch__label" x="118" y="240" textAnchor="middle">
          cloudflared
        </text>
        <text className="homelab-arch__sub" x="118" y="258" textAnchor="middle">
          tunnel
        </text>

        <line className="homelab-arch__line" x1="188" y1="244" x2="220" y2="244" />

        <rect className="homelab-arch__box" x="220" y="216" width="150" height="56" rx="8" />
        <text className="homelab-arch__label" x="295" y="240" textAnchor="middle">
          Reverse proxy
        </text>
        <text className="homelab-arch__sub" x="295" y="258" textAnchor="middle">
          NPM · HTTPS
        </text>

        <line className="homelab-arch__line" x1="370" y1="244" x2="402" y2="244" />

        <rect className="homelab-arch__box homelab-arch__box--accent" x="402" y="208" width="270" height="72" rx="8" />
        <text className="homelab-arch__label" x="537" y="236" textAnchor="middle">
          Self-hosted services
        </text>
        <text className="homelab-arch__sub" x="537" y="256" textAnchor="middle">
          Immich · OpenCloud · ntfy · …
        </text>

        {/* Bottom row */}
        <rect className="homelab-arch__box" x="48" y="312" width="180" height="64" rx="8" />
        <text className="homelab-arch__label" x="138" y="338" textAnchor="middle">
          Pi-hole
        </text>
        <text className="homelab-arch__sub" x="138" y="356" textAnchor="middle">
          DNS + LAN rewrites
        </text>

        <rect className="homelab-arch__box" x="252" y="312" width="180" height="64" rx="8" />
        <text className="homelab-arch__label" x="342" y="338" textAnchor="middle">
          Dockge
        </text>
        <text className="homelab-arch__sub" x="342" y="356" textAnchor="middle">
          stack management
        </text>

        <rect className="homelab-arch__box" x="456" y="312" width="216" height="64" rx="8" />
        <text className="homelab-arch__label" x="564" y="338" textAnchor="middle">
          Monitoring
        </text>
        <text className="homelab-arch__sub" x="564" y="356" textAnchor="middle">
          Kuma · Beszel → ntfy
        </text>
      </svg>
      <figcaption className="homelab-arch__caption-text">
        Outbound tunnel only — no ports opened on the home router.
      </figcaption>
    </figure>
  );
}
