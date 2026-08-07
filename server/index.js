import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Config via env vars
const PORT = process.env.PORT || 4000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // el token seguro en el servidor

if (!GITHUB_TOKEN) {
  console.warn('Warning: GITHUB_TOKEN not set. Remote writes will fail.');
}

// Endpoint para recibir un nuevo post y actualizar data/posts.json
app.post('/add-post', async (req, res) => {
  try {
    const { owner, repo, path = 'data/posts.json', post } = req.body;
    if (!owner || !repo || !post) return res.status(400).json({ error: 'owner, repo and post required' });
    // Leer archivo actual
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const getRes = await fetch(apiUrl, { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } });
    if (!getRes.ok) return res.status(500).json({ error: 'Failed to read remote file', status: getRes.status });
    const fileData = await getRes.json();
    const content = Buffer.from(fileData.content, 'base64').toString('utf8');
    const arr = JSON.parse(content);
    arr.unshift(post);
    const newContent = Buffer.from(JSON.stringify(arr, null, 2), 'utf8').toString('base64');

    // Subir
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
      body: JSON.stringify({ message: 'Add post via admin server', content: newContent, sha: fileData.sha })
    });
    if (!putRes.ok) {
      const err = await putRes.json();
      return res.status(500).json({ error: 'Failed to update remote', details: err });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, () => console.log(`Admin server listening on ${PORT}`));
