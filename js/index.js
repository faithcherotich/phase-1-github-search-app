document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const repoList = document.getElementById("repos-list");
  
    form.addEventListener("submit", event => {
      event.preventDefault();
      const query = document.getElementById("search").value;
      searchGitHubUser(query);
    });
  
    const searchGitHubUser = (query) => {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => console.error('Error fetching users:', error));
    };
  
    const displayUsers = (users) => {
      userList.innerHTML = '';
      repoList.innerHTML = '';
  
      users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <p><a href="${user.html_url}" target="_blank">${user.login}</a></p>
          <button onclick="fetchUserRepos('${user.login}')">View Repos</button>
        `;
        userList.appendChild(userCard);
      });
    };
  
    window.fetchUserRepos = (username) => {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        })
        .catch(error => console.error('Error fetching repos:', error));
    };
  
    const displayRepos = (repos) => {
      repoList.innerHTML = '';
  
      repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'repo-card';
        repoCard.innerHTML = `
          <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
          <p>${repo.description || 'No description available'}</p>
        `;
        repoList.appendChild(repoCard);
      });
    };
  });
 

