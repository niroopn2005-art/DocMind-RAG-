document.getElementById('search-btn').addEventListener('click', async () => {
  const query = document.getElementById('query-input').value;
  const k = document.getElementById('k-value').value;
  const resultsDiv = document.getElementById('results');

  if (!query) {
    alert('Please enter a query first!');
    return;
  }

  resultsDiv.innerHTML = '<p class="placeholder-text">Searching database...</p>';

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&k=${k}`);
    if (response.ok) {
      const data = await response.json();
      renderResults(data);
    } else {
      resultsDiv.innerHTML = `<p class="placeholder-text" style="color: #f85149;">Search failed with status: ${response.status}</p>`;
    }
  } catch (err) {
    console.error('Error during search:', err);
    resultsDiv.innerHTML = '<p class="placeholder-text" style="color: #f85149;">Error connecting to DocMind backend server.</p>';
  }
});

function renderResults(items) {
  const resultsDiv = document.getElementById('results');
  if (!items || items.length === 0) {
    resultsDiv.innerHTML = '<p class="placeholder-text">No relevant document matches found.</p>';
    return;
  }

  resultsDiv.innerHTML = items.map((item, idx) => `
    <div style="background: #0d1117; border: 1px solid #30363d; padding: 15px; border-radius: 6px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="font-weight: bold; color: #58a6ff;">Document #${idx + 1}</span>
        <span style="color: #8b949e; font-size: 12px;">Score: ${(item.score || 0.0).toFixed(4)}</span>
      </div>
      <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #c9d1d9;">${item.text}</p>
    </div>
  `).join('');
}
