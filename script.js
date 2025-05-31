const jobFiles = [
  'jobs/senior-tech-product-owner.json',
  'jobs/tech-product-owner.json',
  'jobs/senior-data-engineer.json',
  'jobs/data-engineer.json'
];

const loadJobs = async () => {
  const container = document.getElementById('job-listings');
  for (const file of jobFiles) {
    try {
      const res = await fetch(file);
      const job = await res.json();

      const jobHtml = `
        <div class="border-l-4 border-indigo-600 pl-4">
          <h3 class="text-lg font-bold text-indigo-700">${job.title} – ${job.team}</h3>
          <p class="text-gray-700">${job.company}, ${job.location}</p>
          <p class="text-xs text-gray-500 mb-2">${job.dates}</p>
          <ul class="list-disc list-inside space-y-1">
            ${job.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      `;
      container.innerHTML += jobHtml;
    } catch (err) { 
      console.error(`Error loading ${file}:`, err);
    }
  }
};

const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Load theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  toggleBtn.textContent = '☀️';
}

// Toggle theme and emoji
toggleBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggleBtn.textContent = isDark ? '☀️' : '🌙';
});





loadJobs();
