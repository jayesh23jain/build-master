export const PROJECT = {
  phases: [
    { num:'01', name:'Foundation & Groundwork', sub:'Excavation, concrete, grading', pct:100, status:'done', color:'#34d399', tags:['Concrete','Excavation','Structural'], cost:'₹15L – ₹25L' },
    { num:'02', name:'Structural Framing', sub:'Steel & timber, load-bearing', pct:68, status:'active', color:'#22d3ee', tags:['Steel','Timber','Engineering'], cost:'₹30L – ₹50L' },
    { num:'03', name:'Electrical & Plumbing', sub:'MEP rough-in, conduit runs', pct:32, status:'active', color:'#f59e4a', tags:['MEP','Conduit','Pipes'], cost:'₹12L – ₹20L' },
    { num:'04', name:'Interiors & Woodwork', sub:'Carpentry, finishes, flooring', pct:0, status:'pending', color:'#4a6070', tags:['Carpentry','Finishes','Design'], cost:'₹20L – ₹40L' },
  ],
  vendors: [
    { initials:'RS', name:'Ravi Sharma', trade:'Foundation & Excavation', rating:4.9, tags:['Concrete','Grading'], phone:'+91 98765 43210', projects:12 },
    { initials:'KP', name:'Kapil Patel', trade:'Structural Framing', rating:5.0, tags:['Steel','Timber'], phone:'+91 87654 32109', projects:18 },
    { initials:'AM', name:'Arjun Mehta', trade:'Electrical & MEP', rating:4.7, tags:['MEP','Conduit'], phone:'+91 76543 21098', projects:9 },
  ],
  activity: [
    { icon:'✓', cls:'green', name:'Ravi Sharma', action:'completed Foundation Phase — signed off by site engineer.', time:'2h ago' },
    { icon:'◈', cls:'cyan', name:'3 new quotes', action:'received for Structural Framing. Review pending.', time:'5h ago' },
    { icon:'▲', cls:'amber', name:'Budget alert', action:'— Electrical phase estimate updated to ₹18.4L.', time:'1d ago' },
    { icon:'✉', cls:'mag', name:'Kapil Patel', action:'sent revised material list for framing phase.', time:'1d ago' },
    { icon:'✓', cls:'green', name:'Permit MCD/2024/0892', action:'approved and uploaded to Vault.', time:'2d ago' },
    { icon:'⚑', cls:'red', name:'Inspection', action:'for Phase 2 scheduled — 15 Jan 2025.', time:'3d ago' },
  ],
  docs: [
    { icon:'📄', name:'Site Survey Report', type:'PDF', size:'2.4 MB', date:'12 Dec 2024' },
    { icon:'📐', name:'Architectural Blueprint', type:'DWG', size:'8.1 MB', date:'15 Dec 2024' },
    { icon:'📋', name:'Foundation Completion', type:'PDF', size:'1.1 MB', date:'02 Jan 2025' },
    { icon:'📑', name:'MCD Permit — 0892', type:'PDF', size:'0.6 MB', date:'05 Jan 2025' },
    { icon:'📊', name:'Budget Breakdown Q4', type:'XLSX', size:'0.9 MB', date:'07 Jan 2025' },
  ],
  timeline: [
    { name:'Foundation Complete', date:'Dec 28, 2024', state:'done' },
    { name:'Frame — 70% Target', date:'Jan 20, 2025', state:'active' },
    { name:'MEP Rough-in', date:'Feb 10, 2025', state:'next' },
    { name:'Interior Works Begin', date:'Mar 01, 2025', state:'next' },
    { name:'Final Handover', date:'May 15, 2025', state:'next' },
  ],
  budget:4200000, spent:1840000,
  budget_cats: [
    { label:'Foundation', spent:2400000, total:2500000, color:'#34d399' },
    { label:'Framing', spent:1200000, total:5000000, color:'#22d3ee' },
    { label:'Electrical', spent:240000, total:1840000, color:'#f59e4a' },
    { label:'Interiors', spent:0, total:4000000, color:'#d946ef' },
  ],
  quotes: [
    { phase:'02', title:'Structural Framing', vendors:['Kapil Patel','Suresh Kumar','Deepak Verma'], amounts:['₹32L','₹38L','₹35L'], status:'review' },
    { phase:'03', title:'Electrical & MEP', vendors:['Arjun Mehta'], amounts:['₹18.4L'], status:'new' },
    { phase:'04', title:'Interiors & Woodwork', vendors:[], amounts:[], status:'open' },
  ],
};
