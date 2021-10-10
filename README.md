# [Github Companies](https://maitre-pangolin.github.io/github-companies/)

An app to find github organisation profiles located in a particular city.

## Technologies

Built using Create-React-App , React Router and Semantic-Ui-React on top of the Github API and a small [node back-end service](https://github.com/Maitre-Pangolin/github-project-backend) deployed on Heroku.
<div>
<img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' width="50" height="50">
<img src='https://react.semantic-ui.com/logo.png' width="50" height=50">
<img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' width="50" height=50">
<img src='https://camo.githubusercontent.com/bf32d0a71c170dbdb203c201579564f2cd7fc54a24720faad61af12c9605c6b5/68747470733a2f2f7265616374747261696e696e672e636f6d2f72656163742d726f757465722f616e64726f69642d6368726f6d652d313434783134342e706e67' width="50" height=50">
</div>

## Context

Single page app, developped to ease job search and discover companies. 

Uses a [small back-end service](https://github.com/Maitre-Pangolin/github-project-backend) to make server-to-server call using a dedicated OAuth2 token to increase the call rate to 30 and 5000 for search and core access respectively. 
## Deployement

Deployement is made through Github Pages.

``` 
npm i gh-pages
```

A ```homepage``` property and a ```deploy``` script neeeds to be added to the ```package.json``` file

```json
"homepage":"https://username.github.io/whateveryouwant",
"scripts": {
    "deploy": "gh-pages -d build",
     ...
     ...
  }
```

``` 
npm run deploy
```
Following a succesfull build and deployement a gh-pages branch should be created and published on GitHub. 
