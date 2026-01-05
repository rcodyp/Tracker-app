import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const HEADER_HEIGHT = '72px';

    return (
        <>
            {/* Header */}
            <header
                style={{
                    height: HEADER_HEIGHT,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 48px',
                    backgroundColor: '#0b0f14',
                    borderBottom: '1px solid #1f2933',
                }}
            >
                <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>
                    Tracker -TO DO
                </h1>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => navigate('/login')}
                        style={ghostButton}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate('/sign')}
                        style={primaryButton}
                    >
                        Sign Up
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section
                style={{
                    minHeight: `calc(100vh - ${HEADER_HEIGHT})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'radial-gradient(1200px 500px at 50% -10%, #1f2933, #0b0f14)',
                    padding: '40px 16px',
                }}
            >
                <div
                    style={{
                        maxWidth: '960px',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <h2
                        style={{
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            fontWeight: 800,
                            marginBottom: '16px',
                            color: '#f9fafb',
                        }}
                    >
                        Track Smarter. Work Better.
                    </h2>

                    <p
                        style={{
                            maxWidth: '640px',
                            margin: '0 auto 40px',
                            fontSize: '18px',
                            lineHeight: '1.6',
                            color: '#9ca3af',
                        }}
                    >
                        Tracker helps teams monitor progress, manage tasks, and stay productive
                        with a clean, intuitive interface built for modern workflows.
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '16px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <button
                            style={primaryCta}
                            onClick={() => navigate('/sign')}
                        >
                            Get Started Free
                        </button>

                        <button
                            style={secondaryCta}
                            onClick={() => navigate('/login')}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

/* ---------- Button Styles ---------- */

const ghostButton = {
    background: 'transparent',
    border: '1px solid #374151',
    color: '#e5e7eb',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 500,
};

const primaryButton = {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
};

const primaryCta = {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.35)',
};

const secondaryCta = {
    background: 'transparent',
    color: '#e5e7eb',
    border: '1px solid #374151',
    padding: '14px 32px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
};
