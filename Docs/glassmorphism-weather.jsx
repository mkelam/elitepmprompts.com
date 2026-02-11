import { useState } from "react";

const hourlyData = [
  { time: "21:00", temp: 22, icon: "🌙" },
  { time: "22:00", temp: 20, icon: "🌙" },
  { time: "23:00", temp: 20, icon: "🌙" },
  { time: "0:00", temp: 19, icon: "🌙" },
  { time: "1:00", temp: 19, icon: "🌙" },
  { time: "2:00", temp: 18, icon: "🌙" },
];

const dailyData = [
  { date: "07/2", day: "Today", condition: "Mostly sunny", high: 28, low: 16, icon: "☀️" },
  { date: "08/2", day: "Sun", condition: "Mostly sunny", high: 30, low: 17, icon: "☀️" },
  { date: "09/2", day: "Mon", condition: "Sunny", high: 30, low: 16, icon: "☀️" },
  { date: "10/2", day: "Tue", condition: "Mostly sunny", high: 30, low: 16, icon: "⛅" },
  { date: "11/2", day: "Wed", condition: "Thunderstorm", high: 27, low: 15, icon: "⛈️" },
];

const MoonIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    <defs>
      <linearGradient id="moonGrad" x1="30" y1="20" x2="90" y2="100">
        <stop offset="0%" stopColor="#C8D8F0" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#8BA4C8" stopOpacity="0.7" />
      </linearGradient>
      <filter id="moonGlow">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="55" cy="55" r="35" fill="url(#moonGrad)" filter="url(#moonGlow)" opacity="0.85" />
    <circle cx="72" cy="42" r="30" fill="#0B0E2D" />
    <circle cx="38" cy="62" r="2" fill="rgba(255,255,255,0.3)" />
    <circle cx="50" cy="45" r="1.5" fill="rgba(255,255,255,0.25)" />
    <circle cx="45" cy="70" r="1" fill="rgba(255,255,255,0.2)" />
    {/* Star */}
    <path d="M82 58 L83.5 62 L87.5 62 L84.5 64.5 L85.5 68.5 L82 66 L78.5 68.5 L79.5 64.5 L76.5 62 L80.5 62 Z"
      fill="#F0D060" opacity="0.7" />
  </svg>
);

const WindIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 8h12a3 3 0 100-3" />
    <path d="M3 16h16a3 3 0 110 3" />
    <path d="M3 12h9a3 3 0 110 3" />
  </svg>
);

const HumidityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
);

const DirectionIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L8 10h8L12 2z" />
    <line x1="12" y1="10" x2="12" y2="22" />
  </svg>
);

export default function GlassmorphismWeather() {
  const [activeTab, setActiveTab] = useState("hourly");

  return (
    <div style={styles.container}>
      {/* Background layers */}
      <div style={styles.bgImage} />
      <div style={styles.bgBase} />
      <div style={styles.bgStars} />
      <div style={styles.bgGlow} />
      <div style={styles.bgHorizon} />

      {/* Content */}
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.locationRow}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={styles.locationText}>Germiston</span>
          </div>
        </div>

        {/* Hero Glass Card */}
        <div style={styles.heroCard}>
          <div style={styles.heroInner}>
            {/* Temperature Display */}
            <div style={styles.tempRow}>
              <div style={styles.tempLow}>
                <span style={styles.tempArrowBlue}>↓</span>
                <span style={styles.tempLowValue}>16°</span>
              </div>
              <div style={styles.conditionCenter}>
                <span style={styles.conditionText}>Mostly clear</span>
              </div>
              <div style={styles.tempHigh}>
                <span style={styles.tempHighValue}>28°</span>
                <span style={styles.tempArrowRed}>↑</span>
              </div>
            </div>

            {/* Current Temp */}
            <div style={styles.currentTempContainer}>
              <span style={styles.currentTemp}>20°C</span>
            </div>

            {/* Weather Details Row */}
            <div style={styles.detailsRow}>
              <div style={styles.detailItem}>
                <DirectionIcon />
                <span style={styles.detailText}>NE</span>
              </div>
              <div style={styles.detailItem}>
                <WindIcon />
                <span style={styles.detailText}>15.0km/h</span>
              </div>
              <div style={styles.detailItem}>
                <HumidityIcon />
                <span style={styles.detailText}>32%</span>
              </div>
            </div>

            {/* Moon Icon */}
            <div style={styles.moonContainer}>
              <MoonIcon />
            </div>

            {/* Precipitation Notice */}
            <div style={styles.precipNotice}>
              <span style={styles.precipText}>No precipitation for at least 120 min</span>
            </div>
          </div>
        </div>

        {/* Hourly Forecast Glass Card */}
        <div style={styles.glassCard}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitleRow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span style={styles.cardTitle}>Hourly Forecast</span>
            </div>
            <button style={styles.moreButton} onClick={() => setActiveTab("hourly")}>
              More
            </button>
          </div>
          <div style={styles.hourlyGrid}>
            {hourlyData.map((h, i) => (
              <div key={i} style={styles.hourlyItem}>
                <span style={styles.hourlyTime}>{h.time}</span>
                <span style={styles.hourlyIcon}>{h.icon}</span>
                <span style={styles.hourlyTemp}>{h.temp}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Forecast Glass Card */}
        <div style={styles.glassCard}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitleRow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span style={styles.cardTitle}>Daily Forecast</span>
            </div>
            <button style={styles.moreButton} onClick={() => setActiveTab("daily")}>
              More
            </button>
          </div>
          <div style={styles.dailyAlert}>
            <span style={styles.alertText}>⚡ A thunderstorm Tuesday evening</span>
          </div>
          <div style={styles.dailyList}>
            {dailyData.map((d, i) => (
              <div key={i} style={{
                ...styles.dailyRow,
                ...(i < dailyData.length - 1 ? styles.dailyRowBorder : {}),
              }}>
                <div style={styles.dailyLeft}>
                  <span style={styles.dailyDate}>{d.date}</span>
                  <span style={styles.dailyDay}>{d.day}</span>
                </div>
                <span style={styles.dailyIcon}>{d.icon}</span>
                <span style={styles.dailyCondition}>{d.condition}</span>
                <span style={styles.dailyTemps}>{d.high}°/{d.low}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* Design Spec Label */}
        <div style={styles.specLabel}>
          <span style={styles.specText}>Glassmorphism Design System — Interactive Reference</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatMoon {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    minHeight: "100vh",
    overflow: "hidden",
    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  // Background layers
  bgImage: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1400' viewBox='0 0 800 1400'>
      <defs>
        <radialGradient id='sky1' cx='50%' cy='15%' r='60%'><stop offset='0%' stop-color='%23121838'/><stop offset='100%' stop-color='%23060810'/></radialGradient>
        <radialGradient id='nebula1' cx='30%' cy='25%' r='35%'><stop offset='0%' stop-color='%23261848' stop-opacity='0.6'/><stop offset='100%' stop-color='transparent'/></radialGradient>
        <radialGradient id='nebula2' cx='70%' cy='35%' r='30%'><stop offset='0%' stop-color='%23182248' stop-opacity='0.4'/><stop offset='100%' stop-color='transparent'/></radialGradient>
        <radialGradient id='glow' cx='50%' cy='78%' r='40%'><stop offset='0%' stop-color='%23D4845A' stop-opacity='0.35'/><stop offset='50%' stop-color='%238B4A3A' stop-opacity='0.15'/><stop offset='100%' stop-color='transparent'/></radialGradient>
        <linearGradient id='horizon' x1='0' y1='0.7' x2='0' y2='1'><stop offset='0%' stop-color='transparent'/><stop offset='30%' stop-color='%231A1228' stop-opacity='0.8'/><stop offset='60%' stop-color='%23352018'/><stop offset='85%' stop-color='%234A2810'/><stop offset='100%' stop-color='%23301A0C'/></linearGradient>
        <filter id='blur1'><feGaussianBlur stdDeviation='2'/></filter>
        <filter id='blur2'><feGaussianBlur stdDeviation='40'/></filter>
      </defs>
      <rect width='800' height='1400' fill='url(%23sky1)'/>
      <rect width='800' height='1400' fill='url(%23nebula1)'/>
      <rect width='800' height='1400' fill='url(%23nebula2)'/>
      <rect width='800' height='1400' fill='url(%23glow)'/>
      <!-- Stars -->
      <circle cx='120' cy='80' r='1.2' fill='white' opacity='0.7'/><circle cx='340' cy='50' r='0.8' fill='white' opacity='0.5'/>
      <circle cx='500' cy='120' r='1.5' fill='white' opacity='0.6'/><circle cx='680' cy='60' r='0.8' fill='white' opacity='0.4'/>
      <circle cx='50' cy='200' r='1' fill='white' opacity='0.5'/><circle cx='250' cy='180' r='1.3' fill='white' opacity='0.6'/>
      <circle cx='450' cy='220' r='0.7' fill='white' opacity='0.4'/><circle cx='600' cy='160' r='1.1' fill='white' opacity='0.55'/>
      <circle cx='750' cy='200' r='0.9' fill='white' opacity='0.45'/><circle cx='150' cy='300' r='1.4' fill='white' opacity='0.5'/>
      <circle cx='380' cy='280' r='0.8' fill='white' opacity='0.6'/><circle cx='550' cy='320' r='1.2' fill='white' opacity='0.45'/>
      <circle cx='700' cy='340' r='0.7' fill='white' opacity='0.5'/><circle cx='80' cy='400' r='1' fill='white' opacity='0.4'/>
      <circle cx='300' cy='380' r='1.5' fill='white' opacity='0.35'/><circle cx='480' cy='420' r='0.9' fill='white' opacity='0.5'/>
      <circle cx='650' cy='450' r='1.1' fill='white' opacity='0.4'/><circle cx='200' cy='500' r='0.8' fill='white' opacity='0.45'/>
      <circle cx='420' cy='140' r='2' fill='%23FFFAE0' opacity='0.8'/><circle cx='190' cy='260' r='1.8' fill='%23E8E0FF' opacity='0.6'/>
      <!-- Milky way band -->
      <ellipse cx='400' cy='350' rx='500' ry='80' fill='%23281E40' opacity='0.2' transform='rotate(-15 400 350)' filter='url(%23blur2)'/>
      <ellipse cx='400' cy='350' rx='400' ry='40' fill='%23382860' opacity='0.15' transform='rotate(-15 400 350)' filter='url(%23blur2)'/>
      <!-- Mountains -->
      <polygon points='0,950 100,820 180,870 280,780 350,830 420,750 500,810 560,770 640,830 720,790 800,850 800,1050 0,1050' fill='%230C0A14' opacity='0.95'/>
      <polygon points='0,980 80,900 150,930 250,860 330,900 400,840 480,890 540,850 620,910 700,870 800,920 800,1050 0,1050' fill='%23080610' opacity='0.9'/>
      <!-- Silhouette figures -->
      <rect x='385' y='910' width='3' height='25' rx='1' fill='%23120E18' opacity='0.8'/>
      <circle cx='386' cy='906' r='4' fill='%23120E18' opacity='0.8'/>
      <rect x='408' y='915' width='2.5' height='22' rx='1' fill='%23120E18' opacity='0.7'/>
      <circle cx='409' cy='911' r='3.5' fill='%23120E18' opacity='0.7'/>
      <!-- Horizon glow -->
      <rect width='800' height='1400' fill='url(%23horizon)'/>
      <!-- Tree silhouettes -->
      <polygon points='60,980 65,920 67,950 72,910 74,945 78,930 80,980' fill='%23060408' opacity='0.8'/>
      <polygon points='720,970 725,905 728,935 733,895 736,930 740,915 744,970' fill='%23060408' opacity='0.7'/>
    </svg>`)}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  },
  bgBase: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "linear-gradient(180deg, rgba(6,8,24,0.35) 0%, rgba(11,14,45,0.3) 15%, rgba(20,18,64,0.25) 35%, rgba(26,21,69,0.3) 50%, rgba(30,26,74,0.35) 65%, rgba(42,30,61,0.4) 80%, rgba(61,42,26,0.45) 95%, rgba(74,53,32,0.5) 100%)",
    zIndex: 1,
  },
  bgStars: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: `
      radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.6), transparent),
      radial-gradient(1px 1px at 25% 8%, rgba(255,255,255,0.4), transparent),
      radial-gradient(1.5px 1.5px at 40% 22%, rgba(255,255,255,0.5), transparent),
      radial-gradient(1px 1px at 55% 5%, rgba(255,255,255,0.3), transparent),
      radial-gradient(1px 1px at 70% 18%, rgba(255,255,255,0.5), transparent),
      radial-gradient(1.5px 1.5px at 85% 12%, rgba(255,255,255,0.4), transparent),
      radial-gradient(1px 1px at 15% 30%, rgba(255,255,255,0.3), transparent),
      radial-gradient(1px 1px at 60% 28%, rgba(255,255,255,0.4), transparent),
      radial-gradient(1px 1px at 90% 25%, rgba(255,255,255,0.3), transparent),
      radial-gradient(1px 1px at 33% 35%, rgba(255,255,255,0.35), transparent),
      radial-gradient(1px 1px at 78% 32%, rgba(255,255,255,0.25), transparent),
      radial-gradient(1px 1px at 5% 42%, rgba(255,255,255,0.3), transparent),
      radial-gradient(1px 1px at 48% 40%, rgba(255,255,255,0.2), transparent),
      radial-gradient(1px 1px at 92% 38%, rgba(255,255,255,0.35), transparent)
    `,
    zIndex: 2,
  },
  bgGlow: {
    position: "fixed",
    top: "30%", left: "20%",
    width: "60%", height: "30%",
    background: "radial-gradient(ellipse, rgba(100, 80, 160, 0.15) 0%, transparent 70%)",
    zIndex: 2,
  },
  bgHorizon: {
    position: "fixed",
    bottom: 0, left: 0, right: 0,
    height: "25%",
    background: "linear-gradient(180deg, transparent 0%, rgba(80, 50, 20, 0.2) 60%, rgba(120, 70, 30, 0.15) 100%)",
    zIndex: 2,
  },

  // Content wrapper
  content: {
    position: "relative",
    zIndex: 10,
    padding: "16px",
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  // Header
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 4px",
    animation: "fadeInUp 0.6s ease-out",
  },
  locationRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  locationText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "20px",
    fontWeight: 500,
    letterSpacing: "0.5px",
  },

  // Hero Card
  heroCard: {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
    animation: "fadeInUp 0.7s ease-out",
  },
  heroInner: {
    padding: "24px 20px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },

  // Current temperature
  currentTempContainer: {
    margin: "-8px 0 4px",
  },
  currentTemp: {
    fontSize: "72px",
    fontWeight: 200,
    color: "rgba(255,255,255,1)",
    letterSpacing: "-2px",
    lineHeight: 1,
  },

  // Temperature row
  tempRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 8px",
  },
  tempLow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  tempHigh: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  tempArrowBlue: {
    color: "#4A9EF5",
    fontSize: "16px",
    fontWeight: 600,
  },
  tempArrowRed: {
    color: "#E85544",
    fontSize: "16px",
    fontWeight: 600,
  },
  tempLowValue: {
    color: "rgba(255,255,255,0.85)",
    fontSize: "18px",
    fontWeight: 400,
  },
  tempHighValue: {
    color: "rgba(255,255,255,0.85)",
    fontSize: "18px",
    fontWeight: 400,
  },
  conditionCenter: {
    textAlign: "center",
  },
  conditionText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "18px",
    fontWeight: 400,
  },

  // Details row
  detailsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "28px",
    padding: "8px 0",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  detailText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
    fontWeight: 400,
  },

  // Moon
  moonContainer: {
    margin: "8px 0",
    animation: "floatMoon 6s ease-in-out infinite",
  },

  // Precipitation
  precipNotice: {
    padding: "8px 0 4px",
  },
  precipText: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "14px",
    fontWeight: 400,
    textDecoration: "underline",
    textDecorationColor: "rgba(255,255,255,0.3)",
    textUnderlineOffset: "4px",
  },

  // Glass Card (shared)
  glassCard: {
    background: "rgba(255, 255, 255, 0.07)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "18px 20px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
    animation: "fadeInUp 0.8s ease-out",
  },

  // Card Header
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  cardTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  cardTitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: "15px",
    fontWeight: 500,
  },

  // More Button (glass-on-glass)
  moreButton: {
    background: "rgba(255, 255, 255, 0.12)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "24px",
    padding: "6px 20px",
    color: "rgba(255,255,255,0.8)",
    fontSize: "13px",
    fontWeight: 400,
    cursor: "pointer",
    transition: "all 0.2s ease",
    outline: "none",
  },

  // Hourly Grid
  hourlyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "4px",
    textAlign: "center",
  },
  hourlyItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    padding: "8px 0",
  },
  hourlyTime: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "14px",
    fontWeight: 500,
  },
  hourlyIcon: {
    fontSize: "22px",
    filter: "brightness(0.85) contrast(1.1)",
  },
  hourlyTemp: {
    color: "rgba(255,255,255,1)",
    fontSize: "17px",
    fontWeight: 400,
  },

  // Daily Alert
  dailyAlert: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    padding: "10px 14px",
    marginBottom: "12px",
  },
  alertText: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "13px",
    fontWeight: 400,
  },

  // Daily List
  dailyList: {
    display: "flex",
    flexDirection: "column",
  },
  dailyRow: {
    display: "flex",
    alignItems: "center",
    padding: "12px 0",
    gap: "12px",
  },
  dailyRowBorder: {
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  dailyLeft: {
    display: "flex",
    flexDirection: "column",
    minWidth: "52px",
  },
  dailyDate: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "11px",
    fontWeight: 400,
  },
  dailyDay: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "15px",
    fontWeight: 500,
  },
  dailyIcon: {
    fontSize: "24px",
    minWidth: "32px",
    textAlign: "center",
  },
  dailyCondition: {
    color: "rgba(255,255,255,0.75)",
    fontSize: "14px",
    fontWeight: 400,
    flex: 1,
  },
  dailyTemps: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "15px",
    fontWeight: 500,
    minWidth: "60px",
    textAlign: "right",
  },

  // Spec Label
  specLabel: {
    textAlign: "center",
    padding: "16px 0 32px",
  },
  specText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "11px",
    fontWeight: 400,
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
};
