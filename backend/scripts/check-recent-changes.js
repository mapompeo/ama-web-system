require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { Pool } = require('pg');

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();

  const since = '2026-06-18 00:00:00';

  const animals = await client.query(
    `SELECT id, name, species, status, responsible_name, created_at FROM public.animals WHERE created_at >= $1 ORDER BY created_at DESC`,
    [since]
  );

  const activities = await client.query(
    `SELECT id, title, activity_date, status, created_at FROM public.activities WHERE created_at >= $1 ORDER BY created_at DESC`,
    [since]
  );

  const records = await client.query(
    `SELECT ar.id, a.name as animal, ar.title, ar.record_date, ar.created_at
     FROM public.animal_records ar JOIN public.animals a ON a.id = ar.animal_id
     WHERE ar.created_at >= $1 ORDER BY ar.created_at DESC`,
    [since]
  );

  const users = await client.query(
    `SELECT id, name, email, created_at FROM public.users WHERE created_at >= $1 ORDER BY created_at DESC`,
    [since]
  );

  client.release();
  await pool.end();

  console.log(`\n=== Alterações desde ${since} ===\n`);

  console.log(`ANIMAIS novos (${animals.rows.length}):`);
  animals.rows.forEach(r => console.log(`  [${r.created_at.toISOString().slice(0,16)}] #${r.id} ${r.name} (${r.species}) - ${r.status} - resp: ${r.responsible_name || '-'}`));

  console.log(`\nATIVIDADES novas (${activities.rows.length}):`);
  activities.rows.forEach(r => console.log(`  [${r.created_at.toISOString().slice(0,16)}] #${r.id} "${r.title}" em ${r.activity_date?.toISOString().slice(0,10)} - ${r.status}`));

  console.log(`\nREGISTROS HISTÓRICOS novos (${records.rows.length}):`);
  records.rows.forEach(r => console.log(`  [${r.created_at.toISOString().slice(0,16)}] #${r.id} animal: ${r.animal} - "${r.title}" em ${r.record_date?.toISOString().slice(0,10)}`));

  console.log(`\nUSUÁRIOS novos (${users.rows.length}):`);
  users.rows.forEach(r => console.log(`  [${r.created_at.toISOString().slice(0,16)}] #${r.id} ${r.name} <${r.email}>`));
}

main().catch(err => { console.error('Erro:', err.message); process.exit(1); });
