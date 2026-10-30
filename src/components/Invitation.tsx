"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { wedding } from "@/lib/wedding";
const pakistaniImages: Record<string, string> = {"People_in_elegant_at.png": "pk-attire.png"};
const img = (name: string) => name.startsWith("pk-") ? `/pakistani/${name}` : pakistaniImages[name] ? `/pakistani/${pakistaniImages[name]}` : `/images/${name}`;
function Divider() { return <img className="divider" data-reveal="zoom" src={img("line-divider2.png")} alt="" aria-hidden="true" />; }
function Heading({ children }: { children: React.ReactNode }) { return <><h2>{children}</h2><Divider /></>; }
function Countdown() {
  const [values, setValues] = useState([0, 0, 0, 0]);
  useEffect(() => {
    function tick() { const remaining = Math.max(0, new Date(wedding.date).getTime() - Date.now()); setValues([Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60]); }
    tick(); const timer = setInterval(tick, 1000); return () => clearInterval(timer);
  }, []);
  return <div className="countdown" data-reveal="fade" aria-label="Time until the Baraat">{["Days", "Hours", "Minutes", "Seconds"].map((label, i) => <div key={label}><span className="number">{String(values[i]).padStart(2, "0")}</span><span className="unit">{label}</span></div>)}</div>;
}
export default function Invitation() {
  const [envelope, setEnvelope] = useState("closed");
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const openingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeline = useRef<HTMLOListElement>(null);
  useEffect(() => { document.body.style.overflow = envelope === "open" ? "" : "hidden"; return () => { document.body.style.overflow = ""; }; }, [envelope]);
  useEffect(() => () => { if (openingTimer.current) clearTimeout(openingTimer.current); }, []);
  useEffect(() => {
    if (envelope !== "open") return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } }), { threshold: .1 });
    document.querySelectorAll("[data-reveal]").forEach(e => observer.observe(e));
    let frame = 0;
    function update() { frame = 0; const element = timeline.current; if (!element) return; const progress = Math.max(0, Math.min(1, (innerHeight * .5 - element.getBoundingClientRect().top - 25) / 300)); element.style.setProperty("--travel", `${progress * 247}px`); element.style.setProperty("--turn", `${progress * 134}deg`); }
    function scroll() { if (!frame) frame = requestAnimationFrame(update); }
    update(); window.addEventListener("scroll", scroll, { passive: true }); window.addEventListener("resize", scroll);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); };
  }, [envelope]);
  function open() {
    if (envelope !== "closed") return;
    window.scrollTo(0, 0); setEnvelope("opening"); if (audio.current) audio.current.volume = 0.35; audio.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    openingTimer.current = setTimeout(() => setEnvelope("open"), matchMedia("(prefers-reduced-motion: reduce)").matches ? 100 : 5000);
  }
  function toggleMusic() { const a = audio.current; if (!a) return; if (a.paused) a.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); else { a.pause(); setPlaying(false); } }
  return <>
    <audio ref={audio} src="/media/wedding-piano.wav" loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    {envelope === "open" && <button className="music-toggle" onClick={toggleMusic} aria-label={playing ? "Pause background music" : "Play background music"} aria-pressed={playing} title={playing ? "Pause music" : "Play music"}>{playing ? "Ⅱ" : "♫"}</button>}
    <div className={`invitation-shell ${envelope !== "closed" ? "entering" : ""}`}>

      {envelope !== "open" && <div className={`envelope ${envelope === "opening" ? "opening" : ""}`}>
        <div className="envelope-base" /><img className="flap left-flap" src={img("Gemini_Generated_Ima.png")} alt="" /><img className="flap right-flap" src={img("Gemini_Generated_Ima.png")} alt="" /><img className="flap bottom-flap" src={img("Gemini_Generated_Ima.png")} alt="" /><img className="flap top-flap" src={img("623915249_2629494717.png")} alt="" />
        <button onClick={open} disabled={envelope === "opening"} className="seal-button" aria-label="Open the invitation"><img src={img("tild3366-6538-4432-b138-323436663963-623915249_2629494717.png")} alt="Gold seal with Arabic calligraphy" fetchPriority="high" /><span>Tap to open</span><img className="seal-divider" src={img("line_flower_1.png")} alt="" /></button>
      </div>}
      <main inert={envelope !== "open"}>
        <section className="hero"><video autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="/media/hero.mp4" type="video/mp4" /></video><div className="hero-bottom" /><div className="hero-names" data-enter><p className="hero-bismillah" lang="ar" dir="rtl">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p><p className="hero-family-intro">Together with their families</p><p className="hero-parents">Mr. and Mrs.<br />Tariq Mahmood Rana</p><p className="hero-invitation">Cordially invite you to celebrate<br />the joyous occasion of the Baraat<br />of their beloved son</p><h1><span>{wedding.groom}</span><span className="ampersand">&amp;</span><span>{wedding.bride}</span></h1><p className="hero-tagline">Together, with love and duas,<br />we begin our forever.</p></div><div className="sparkles" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ "--x": `${(i * 37 + 9) % 100}%`, "--delay": `${i * .47}s`, "--duration": `${4 + i % 4}s` } as CSSProperties} />)}</div></section>
        <section className="arabic-invitation"><img className="arch" src={img("frsame_1.png")} alt="" /><img className="bismillah" src={img("Group_204_2.png")} alt="بسم الله الرحمن الرحيم" data-reveal /><img className="arabic-flower" src={img("Vector.png")} alt="" /><div className="arabic-copy" lang="ar" dir="rtl" data-reveal><p>اللَّهُمَّ بَارِكْ لَهُمَا<br />وَبَارِكْ عَلَيْهِمَا<br />وَاجْمَعْ بَيْنَهُمَا فِي خَيْرٍ</p><p>اللَّهُمَّ اجْعَلْ بَيْنَهُمَا<br />مَوَدَّةً وَرَحْمَةً<br />وَارْزُقْهُمَا حَيَاةً سَعِيدَةً</p><p className="dua-translation" lang="ur">یا اللہ! دونوں کو برکت عطا فرما،<br />ان کے درمیان محبت اور رحمت رکھ،<br />اور انہیں خوشیوں بھری زندگی عطا فرما۔ آمین</p></div><p className="arabic-venue" data-reveal>{wedding.venue}</p><img className="arabic-divider" data-reveal src={img("line_flower_1.png")} alt="" /></section>
        <section className="celebration"><Heading>Our Baraat Begins In</Heading><Countdown /></section>
        <section className="schedule"><Heading>Baraat Ceremony</Heading><p className="ceremony-date">{wedding.displayDate}</p><ol ref={timeline} className="timeline">{wedding.events.map(event => <li key={event.time}><time>{event.time}</time><img className="timeline-dot" src={img("Decoration_elements_.png")} alt="" /><span>{event.name}</span></li>)}<img className="timeline-flower" src={img("flower-decor.png")} alt="" aria-hidden="true" /></ol></section>
        <section className="venue"><Heading>Baraat Venue</Heading><img className="place-icon" src={img("ic_baseline-place_1.png")} alt="" /><h3 data-reveal>{wedding.venue}</h3><p data-reveal>{wedding.city}</p><a href={wedding.mapLink} target="_blank" rel="noreferrer" aria-label="View the Baraat venue on Google Maps"><img className="venue-art" src={img("Group_222.png")} alt="Illustrative Mughal-style wedding palace" loading="lazy" /></a></section>
        <section className="walima-ceremony"><Heading>Walima Ceremony</Heading><p>{wedding.walima.displayDate}</p><p className="ceremony-time">{wedding.walima.time}</p><img className="place-icon" src={img("ic_baseline-place_1.png")} alt="" /><h3>{wedding.walima.venue}</h3><p>{wedding.walima.city}</p><a className="venue-link" href={wedding.walima.mapLink} target="_blank" rel="noreferrer">View Walima Venue on Google Maps</a></section>
        <section className="map-section"><Heading>Baraat Location</Heading><div className="map-frame"><iframe src={wedding.map} title="Baraat venue — Al Farid Marriage Lawn" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /></div></section>
        <section className="map-section"><Heading>Walima Location</Heading><div className="map-frame"><iframe src={wedding.walima.map} title="Walima venue — Lataska Marriage Hall" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /></div></section>
        <footer><img className="chandelier" data-reveal="swing" src={img("Create_PNG_image_cha.png")} alt="Lustre doré" loading="lazy" /><h2>Celebrate With Us</h2><p className="footer-message">Your presence will make<br />our celebration complete.</p><img className="footer-line" src={img("decor-line_1.png")} alt="" /><img className="footer-flower" src={img("Fine-line_flowers_Mo.png")} alt="" /></footer>
        <section className="gracious-presence" aria-labelledby="gracious-presence-heading"><h2 id="gracious-presence-heading">Looking Forward to<br />Your Gracious Presence</h2><Divider /><address className="family-contacts"><div><p>Tariq Mehmood Rana</p><a href="tel:03006808037">03006808037</a></div><div><p>Rana Adeel Tariq</p><a href="tel:03013939603">03013939603</a></div><div><p>Rana Amman Tariq</p><a href="tel:03229767300">03229767300</a></div></address></section>
        <section className="closing-video" aria-label="With love and prayers"><video autoPlay muted loop playsInline preload="none" aria-hidden="true"><source src="/media/closing.mp4" type="video/mp4" /></video><div /><div className="closing-message"><h2>With Love &amp; Duas</h2><p>Two hearts, one beautiful journey.<br />Keep us in your prayers, always.</p><p className="closing-names">Ammar &amp; Musfirah</p></div></section>
      </main>
    </div>

  </>;
}
