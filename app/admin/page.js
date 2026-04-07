"use client";

import { useState, useEffect } from "react";

// ─── Default seed data (matches your manModels.js) ───────────────────────────
const SEED_MODELS = [
  { id: 1, slug: "arjun-kapoor",    name: "Arjun Kapoor",    specialty: "Fashion · Editorial",     tag: "fashion",    price: "₹8,000",  height: '6\'1"', age: "24", experience: "5 Yrs", location: "Mumbai",    cover: "https://picsum.photos/seed/skg-man1/480/640" },
  { id: 2, slug: "rohan-mehra",     name: "Rohan Mehra",     specialty: "Commercial · Print",      tag: "commercial", price: "₹6,500",  height: '5\'11"',age: "27", experience: "3 Yrs", location: "Delhi",     cover: "https://picsum.photos/seed/skg-man2/480/640" },
  { id: 3, slug: "vikram-singh",    name: "Vikram Singh",    specialty: "Fitness · Sports",        tag: "fitness",    price: "₹9,000",  height: '6\'2"', age: "26", experience: "6 Yrs", location: "Pune",      cover: "https://picsum.photos/seed/skg-man3/480/640" },
  { id: 4, slug: "karan-malhotra",  name: "Karan Malhotra",  specialty: "Editorial · Runway",      tag: "fashion",    price: "₹12,000", height: '6\'0"', age: "23", experience: "4 Yrs", location: "Mumbai",    cover: "https://picsum.photos/seed/skg-man4/480/640" },
  { id: 5, slug: "rahul-verma",     name: "Rahul Verma",     specialty: "Commercial · TV",         tag: "commercial", price: "₹7,000",  height: '5\'10"',age: "29", experience: "7 Yrs", location: "Hyderabad", cover: "https://picsum.photos/seed/skg-man5/480/640" },
  { id: 6, slug: "dev-sharma",      name: "Dev Sharma",      specialty: "Fitness · Brand Promo",   tag: "fitness",    price: "₹10,500", height: '6\'3"', age: "25", experience: "4 Yrs", location: "Bangalore", cover: "https://picsum.photos/seed/skg-man6/480/640" },
  { id: 7, slug: "aakash-jain",     name: "Aakash Jain",     specialty: "Editorial · Print",       tag: "editorial",  price: "₹11,000", height: '6\'1"', age: "22", experience: "2 Yrs", location: "Delhi",     cover: "https://picsum.photos/seed/skg-man7/480/640" },
  { id: 8, slug: "samar-khanna",    name: "Samar Khanna",    specialty: "Fashion · Runway",        tag: "fashion",    price: "₹14,000", height: '6\'2"', age: "24", experience: "5 Yrs", location: "Mumbai",    cover: "https://picsum.photos/seed/skg-man8/480/640" },
  { id: 9, slug: "nikhil-das",      name: "Nikhil Das",      specialty: "Commercial · Digital",    tag: "commercial", price: "₹5,500",  height: '5\'9"', age: "30", experience: "8 Yrs", location: "Kolkata",   cover: "https://picsum.photos/seed/skg-man9/480/640" },
  { id: 10,slug: "tarun-roy",       name: "Tarun Roy",       specialty: "Editorial · Campaign",    tag: "editorial",  price: "₹13,500", height: '6\'0"', age: "26", experience: "5 Yrs", location: "Chennai",   cover: "https://picsum.photos/seed/skg-man10/480/640"},
  { id: 11,slug: "ajay-bose",       name: "Ajay Bose",       specialty: "Fitness · Health Brand",  tag: "fitness",    price: "₹8,500",  height: '6\'1"', age: "28", experience: "6 Yrs", location: "Ahmedabad", cover: "https://picsum.photos/seed/skg-man11/480/640"},
  { id: 12,slug: "siddharth-rao",   name: "Siddharth Rao",   specialty: "Fashion · Luxury",        tag: "fashion",    price: "₹16,000", height: '6\'2"', age: "23", experience: "3 Yrs", location: "Mumbai",    cover: "https://picsum.photos/seed/skg-man12/480/640"},
];

const TAGS = ["fashion", "commercial", "fitness", "editorial"];
const LOCATIONS = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Kolkata", "Chennai", "Ahmedabad"];

const EMPTY_FORM = {
  name: "", specialty: "", tag: "fashion", price: "",
  height: "", age: "", experience: "", location: "Mumbai",
  cover: "",
};

function toSlug(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconPlus   = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>;
const IconTrash  = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const IconEdit   = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4z"/></svg>;
const IconClose  = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const IconExport = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [models, setModels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [toast, setToast] = useState(null);
  const [exportVisible, setExportVisible] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("skg_models");
      setModels(saved ? JSON.parse(saved) : SEED_MODELS);
    } catch { setModels(SEED_MODELS); }
  }, []);

  const save = (updated) => {
    setModels(updated);
    localStorage.setItem("skg_models", JSON.stringify(updated));
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Filtered list ──
  const filtered = models.filter(m => {
    const matchTag = filterTag === "all" || m.tag === filterTag;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.location.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  // ── Add / Edit submit ──
  const handleSubmit = () => {
    if (!form.name || !form.specialty || !form.price) {
      showToast("Name, Specialty aur Price required hai!", "error");
      return;
    }
    if (editId !== null) {
      const updated = models.map(m => m.id === editId
        ? { ...m, ...form, slug: toSlug(form.name) }
        : m
      );
      save(updated);
      showToast(`${form.name} update ho gaya ✓`);
    } else {
      const newModel = {
        ...form,
        id: Date.now(),
        slug: toSlug(form.name),
        cover: form.cover || `https://picsum.photos/seed/skg-new-${Date.now()}/480/640`,
        photos: [`https://picsum.photos/seed/skg-new-${Date.now()}-a/900/1200`],
      };
      save([...models, newModel]);
      showToast(`${form.name} add ho gaya ✓`);
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (m) => {
    setForm({ name:m.name, specialty:m.specialty, tag:m.tag, price:m.price,
               height:m.height, age:m.age, experience:m.experience,
               location:m.location, cover:m.cover });
    setEditId(m.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const m = models.find(x => x.id === id);
    save(models.filter(x => x.id !== id));
    setDeleteId(null);
    showToast(`${m?.name} delete ho gaya`);
  };

  const exportCode = () => {
    const code = `const SEED = "https://picsum.photos/seed/";\n\nexport const manModels = [\n${models.map(m => `  {\n    id: ${m.id},\n    slug: "${m.slug}",\n    name: "${m.name}",\n    specialty: "${m.specialty}",\n    tag: "${m.tag}",\n    price: "${m.price}",\n    height: "${m.height}",\n    age: "${m.age}",\n    experience: "${m.experience}",\n    location: "${m.location}",\n    cover: "${m.cover}",\n    photos: ${JSON.stringify(m.photos || [])},\n  }`).join(",\n")}\n];\n`;
    navigator.clipboard.writeText(code).then(() => showToast("Code clipboard mein copy ho gaya! 📋"));
    setExportVisible(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Josefin+Sans:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; }
        .pf { font-family: 'Playfair Display', serif; }
        .js { font-family: 'Josefin Sans', sans-serif; }
        .gold { background: linear-gradient(135deg,#c9a84c,#f5d98b,#c9a84c); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .gold-border { border-color: rgba(201,168,76,0.35); }
        .btn-gold { background: linear-gradient(135deg,#c9a84c,#e8c96e); color:#080808; font-weight:700; }
        .btn-gold:hover { filter: brightness(1.1); }
        .input-field { background: rgba(255,255,255,0.04); border: 1px solid rgba(201,168,76,0.2); color:#e8d5a3; padding: 10px 14px; width:100%; outline:none; transition: border-color .2s; font-family:'Josefin Sans',sans-serif; font-size:12px; letter-spacing:1px; }
        .input-field:focus { border-color: rgba(201,168,76,0.6); }
        .input-field::placeholder { color: rgba(232,213,163,0.25); }
        .row-hover:hover { background: rgba(201,168,76,0.04); }
        .tag-pill { display:inline-block; padding:2px 10px; border:1px solid rgba(201,168,76,0.3); font-family:'Josefin Sans',sans-serif; font-size:9px; letter-spacing:2px; text-transform:uppercase; color:#c9a84c; }
        .modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(6px); z-index:50; display:flex; align-items:center; justify-content:center; padding:16px; }
        .modal { background: linear-gradient(160deg,#0e0c07,#140f04); border:1px solid rgba(201,168,76,0.2); width:100%; max-width:560px; max-height:90vh; overflow-y:auto; padding:32px; }
        .toast { position:fixed; bottom:28px; right:28px; z-index:100; padding:12px 20px; font-family:'Josefin Sans',sans-serif; font-size:11px; letter-spacing:2px; animation: slideUp .3s ease; }
        @keyframes slideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeIn .4s ease; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        select option { background:#1a1508; color:#e8d5a3; }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#080808; } ::-webkit-scrollbar-thumb { background:#c9a84c55; }
      `}</style>

      <div   style={{ minHeight:"100vh", background:"linear-gradient(160deg,#080808 0%,#0e0a03 50%,#080808 100%)", color:"#e8d5a3" }}>

        {/* ── HEADER ── */}
        <header style={{ borderBottom:"1px solid rgba(201,168,76,0.12)", padding:"20px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(0,0,0,0.4)", backdropFilter:"blur(12px)", position:"sticky", marginTop:"4rem", top:0, zIndex:10 }}>
          <div>
            <p className="js" style={{ fontSize:"9px", letterSpacing:"5px", color:"rgba(201,168,76,0.5)", textTransform:"uppercase", marginBottom:"4px" }}>SKG Production</p>
            <h1 className="pf" style={{ fontSize:"22px", fontWeight:900 }}><span className="gold">Admin Panel</span></h1>
          </div>
          <div style={{ display:"flex", gap:"10px" }}>
            <button onClick={exportCode} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"9px 16px", border:"1px solid rgba(201,168,76,0.3)", background:"transparent", color:"#c9a84c", cursor:"pointer", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase" }} className="js">
              <IconExport/> Export JS
            </button>
            <button onClick={() => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); }} className="btn-gold js" style={{ display:"flex", alignItems:"center", gap:"6px", padding:"9px 18px", border:"none", cursor:"pointer", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase" }}>
              <IconPlus/> Add Model
            </button>
          </div>
        </header>

        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"28px 20px" }}>

          {/* ── STATS ── */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"12px", marginBottom:"28px" }} className="fade-in">
            {[
              { label:"Total Models", val: models.length, color:"#c9a84c" },
              { label:"Fashion",      val: models.filter(m=>m.tag==="fashion").length,    color:"#d4a0c8" },
              { label:"Commercial",   val: models.filter(m=>m.tag==="commercial").length, color:"#89b4d4" },
              { label:"Fitness",      val: models.filter(m=>m.tag==="fitness").length,    color:"#89d4a0" },
              { label:"Editorial",    val: models.filter(m=>m.tag==="editorial").length,  color:"#d4c289" },
            ].map(s => (
              <div key={s.label} style={{ border:"1px solid rgba(201,168,76,0.12)", padding:"18px 20px", background:"rgba(255,255,255,0.02)" }}>
                <div className="pf" style={{ fontSize:"32px", fontWeight:900, color:s.color, lineHeight:1 }}>{s.val}</div>
                <div className="js" style={{ fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"rgba(232,213,163,0.4)", marginTop:"6px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── SEARCH + FILTER ── */}
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"20px" }}>
            <input
              className="input-field"
              style={{ maxWidth:"280px" }}
              placeholder="Search name / city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
              {["all", ...TAGS].map(t => (
                <button key={t} onClick={() => setFilterTag(t)} className="js"
                  style={{ padding:"8px 14px", border:`1px solid ${filterTag===t?"rgba(201,168,76,0.7)":"rgba(201,168,76,0.2)"}`, background:filterTag===t?"rgba(201,168,76,0.1)":"transparent", color:filterTag===t?"#f5d98b":"rgba(201,168,76,0.5)", cursor:"pointer", fontSize:"9px", letterSpacing:"2px", textTransform:"uppercase", transition:"all .2s" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* ── TABLE ── */}
          <div style={{ border:"1px solid rgba(201,168,76,0.12)", overflow:"hidden" }}>
            {/* Head */}
            <div className="js" style={{ display:"grid", gridTemplateColumns:"60px 1fr 120px 100px 80px 100px 110px 90px", padding:"12px 16px", borderBottom:"1px solid rgba(201,168,76,0.15)", background:"rgba(201,168,76,0.05)", fontSize:"8px", letterSpacing:"3px", textTransform:"uppercase", color:"rgba(201,168,76,0.5)", gap:"8px" }}>
              <span>Photo</span><span>Model</span><span>Specialty</span><span>Tag</span><span>Age</span><span>Location</span><span>Price</span><span style={{textAlign:"right"}}>Actions</span>
            </div>

            {filtered.length === 0 && (
              <div className="js" style={{ padding:"48px", textAlign:"center", color:"rgba(232,213,163,0.2)", fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase" }}>
                Koi model nahi mila
              </div>
            )}

            {filtered.map((m, i) => (
              <div key={m.id} className="row-hover fade-in" style={{ display:"grid", gridTemplateColumns:"60px 1fr 120px 100px 80px 100px 110px 90px", padding:"12px 16px", borderBottom:"1px solid rgba(201,168,76,0.07)", alignItems:"center", gap:"8px", animationDelay:`${i*0.03}s` }}>
                {/* Avatar */}
                <img src={m.cover} alt={m.name} style={{ width:40, height:52, objectFit:"cover", display:"block" }} />
                {/* Name */}
                <div>
                  <div className="pf" style={{ fontSize:"14px", fontWeight:700, color:"#e8d5a3" }}>{m.name}</div>
                  <div className="js" style={{ fontSize:"9px", color:"rgba(201,168,76,0.4)", letterSpacing:"1px", marginTop:"2px" }}>/{m.slug}</div>
                </div>
                {/* Specialty */}
                <div className="js" style={{ fontSize:"9px", color:"rgba(232,213,163,0.5)", letterSpacing:"1px" }}>{m.specialty}</div>
                {/* Tag */}
                <span className="tag-pill">{m.tag}</span>
                {/* Age */}
                <div className="js" style={{ fontSize:"11px", color:"rgba(232,213,163,0.6)" }}>{m.age} yrs</div>
                {/* Location */}
                <div className="js" style={{ fontSize:"10px", color:"rgba(232,213,163,0.5)", letterSpacing:"1px" }}>{m.location}</div>
                {/* Price */}
                <div className="js" style={{ fontSize:"11px", color:"#c9a84c", fontWeight:600 }}>{m.price}</div>
                {/* Actions */}
                <div style={{ display:"flex", gap:"6px", justifyContent:"flex-end" }}>
                  <button onClick={() => handleEdit(m)} style={{ padding:"6px 8px", border:"1px solid rgba(201,168,76,0.25)", background:"transparent", color:"#c9a84c", cursor:"pointer", display:"flex", alignItems:"center" }} title="Edit">
                    <IconEdit/>
                  </button>
                  <button onClick={() => setDeleteId(m.id)} style={{ padding:"6px 8px", border:"1px solid rgba(255,80,80,0.25)", background:"transparent", color:"#ff6060", cursor:"pointer", display:"flex", alignItems:"center" }} title="Delete">
                    <IconTrash/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="js" style={{ marginTop:"12px", fontSize:"9px", letterSpacing:"2px", color:"rgba(201,168,76,0.3)", textTransform:"uppercase", textAlign:"right" }}>
            {filtered.length} of {models.length} models shown
          </div>
        </div>
      </div>

      {/* ── ADD / EDIT MODAL ── */}
      {showForm && (
        <div className="modal-bg" onClick={e => { if(e.target===e.currentTarget){setShowForm(false);setEditId(null);} }}>
          <div className="modal fade-in">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
              <h2 className="pf" style={{ fontSize:"20px", fontWeight:900 }}>
                <span className="gold">{editId ? "Model Edit Karo" : "Naya Model Add Karo"}</span>
              </h2>
              <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ background:"transparent", border:"none", color:"rgba(201,168,76,0.5)", cursor:"pointer", padding:"4px" }}>
                <IconClose/>
              </button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              {[
                { key:"name",       label:"Full Name *",     placeholder:"Arjun Kapoor" },
                { key:"specialty",  label:"Specialty *",     placeholder:"Fashion · Editorial" },
                { key:"price",      label:"Price *",         placeholder:"₹8,000" },
                { key:"height",     label:"Height",          placeholder:'6\'1"' },
                { key:"age",        label:"Age",             placeholder:"24" },
                { key:"experience", label:"Experience",      placeholder:"5 Yrs" },
                { key:"cover",      label:"Cover Image URL", placeholder:"https://..." },
              ].map(f => (
                <div key={f.key} style={f.key==="cover"?{gridColumn:"1/-1"}:{}}>
                  <label className="js" style={{ display:"block", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"rgba(201,168,76,0.5)", marginBottom:"6px" }}>{f.label}</label>
                  <input className="input-field" placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm(p=>({...p,[f.key]:e.target.value}))} />
                </div>
              ))}

              <div>
                <label className="js" style={{ display:"block", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"rgba(201,168,76,0.5)", marginBottom:"6px" }}>Category</label>
                <select className="input-field" value={form.tag} onChange={e => setForm(p=>({...p,tag:e.target.value}))}>
                  {TAGS.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
                </select>
              </div>

              <div>
                <label className="js" style={{ display:"block", fontSize:"9px", letterSpacing:"3px", textTransform:"uppercase", color:"rgba(201,168,76,0.5)", marginBottom:"6px" }}>City</label>
                <select className="input-field" value={form.location} onChange={e => setForm(p=>({...p,location:e.target.value}))}>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display:"flex", gap:"10px", marginTop:"24px" }}>
              <button onClick={handleSubmit} className="btn-gold js" style={{ flex:1, padding:"12px", border:"none", cursor:"pointer", fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase" }}>
                {editId ? "Save Changes" : "Add Model"}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="js" style={{ padding:"12px 20px", border:"1px solid rgba(201,168,76,0.2)", background:"transparent", color:"rgba(201,168,76,0.5)", cursor:"pointer", fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM ── */}
      {deleteId && (
        <div className="modal-bg" onClick={e => { if(e.target===e.currentTarget) setDeleteId(null); }}>
          <div className="modal fade-in" style={{ maxWidth:"380px" }}>
            <h2 className="pf" style={{ fontSize:"22px", fontWeight:900, marginBottom:"12px" }}>
              <span style={{ color:"#ff6060" }}>Delete Karna Hai?</span>
            </h2>
            <p className="js" style={{ fontSize:"11px", color:"rgba(232,213,163,0.5)", letterSpacing:"1px", lineHeight:1.7, marginBottom:"24px" }}>
              <strong style={{ color:"#e8d5a3" }}>{models.find(m=>m.id===deleteId)?.name}</strong> ko delete kar doge? Yeh action undo nahi ho sakta.
            </p>
            <div style={{ display:"flex", gap:"10px" }}>
              <button onClick={() => handleDelete(deleteId)} className="js" style={{ flex:1, padding:"11px", background:"rgba(255,80,80,0.15)", border:"1px solid rgba(255,80,80,0.4)", color:"#ff6060", cursor:"pointer", fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase" }}>
                Haan, Delete Karo
              </button>
              <button onClick={() => setDeleteId(null)} className="js" style={{ padding:"11px 20px", border:"1px solid rgba(201,168,76,0.2)", background:"transparent", color:"rgba(201,168,76,0.5)", cursor:"pointer", fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className="toast js" style={{ background: toast.type==="error" ? "rgba(255,60,60,0.15)" : "rgba(201,168,76,0.12)", border:`1px solid ${toast.type==="error"?"rgba(255,60,60,0.4)":"rgba(201,168,76,0.4)"}`, color: toast.type==="error"?"#ff7070":"#f5d98b", letterSpacing:"2px" }}>
          {toast.msg}
        </div>
      )}
    </>
  );
}
