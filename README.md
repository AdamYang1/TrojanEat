<!-- [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier) -->

[![OSCS Status](https://www.oscs1024.com/platform/badge/AdamYang1/TrojanEat.svg?size=small)](https://www.oscs1024.com/project/AdamYang1/TrojanEat?ref=badge_small)
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AdamYang1/TrojanEat">
    <!-- <img src="pages/images/logo.png" alt="Logo" width="80" height="80"> -->
  <img src="https://s2.loli.net/2022/08/06/hvIAKCQmqYcuOGD.png" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">TrojanEat</h1>

  <p align="center">
    An awesome application for USC student!
    <br />
    <a href="https://github.com/AdamYang1/TrojanEat"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/AdamYang1/TrojanEat">View Demo</a>
    ·
    <a href="https://github.com/AdamYang1/TrojanEat/issues">Report Bug</a>
    ·
    <a href="https://github.com/AdamYang1/TrojanEat/issues">Request Feature</a>
  </p>
  <br>
</div>

## About the Project

> This is a USC dining hall recommendation application specifically targeting Chinese Freshman who are likely to have hard time reading menus. It saves students time by providing translations, recommendations, and dining hall details (ex. vegan dining hall). Users will be asked to pick their favourite types of food and will receive recommendation dining hall accordingly.

### Important Note

This is an application deployed on WeChat-based environment. Therefore, you have to install [WeChat](https://www.wechat.com/) on your phone to use this application. Nevertheless, you are welcome to test the server using APIs.

Even though it is designed for USC Chinese student, everyone is welcome to use the app and contribute to the app.

### Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Table of contents

- [About the Project](#about-the-project)
  - [Important Note](#important-note)
  - [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Testing](#testing)
  - [Testing the app](#testing-the-app)
- [API](#api)
  - [Routes](#routes)
- [Contributing](#contributing)
  - [Built With](#built-with)
- [Author & Contributors](#author--contributors)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/AdamYang1/TrojanEat.git
$ cd TrojanEat/cloud
```

To install and set up the library, run:

```sh
$ npm install
```

## Testing

### Testing the app

```sh
$ npm start
```

## API

### Routes

| Route     | Utility                                                                           |
| --------- | --------------------------------------------------------------------------------- |
| db        | connect to database (hided)                                                       |
| menu      | get all menu & recommended menu                                                   |
| personal  | get & update user preferences && update dining hall ranking based on user choices |
| procdata  | get & update user preferences && update dining hall ranking based on user choices |
| recommend | analyze & update user preferences && return recommendation                        |
| allergen  | update & get user allergen (deleted)                                              |
| vegan     | analyze & return the vegan dining hall on Monday                                  |

If present, the request will be performed as soon as the component is mounted

## Contributing

Please read follow process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [![Node][node.js]][node-url]
- [![Express][express.js]][express-url]
- [![python][python]][python-url]
- [![mysql][mysql]][mysql-url]
- [![Javascript][javascript.js]][javascript-url]
- [![html][html]][html-url]
- [![css][css]][css-url]
- [![postman][postman]][postman-url]
- [![figma][figma]][figma-url]
- [![heroku][heroku]][heroku-url]

<p align="right">(<a href="#top">back to top</a>)</p>

## Author & Contributors

- **Adam Yang** - _Initial & Entire work_ - [AdamYang](https://github.com/AdamYang1)
- **Celine Wen** - _User Interface & LOGO Design_ - [CelineWen](https://www.linkedin.com/in/celinewen)

See also the list of [contributors](https://github.com/AdamYang1/TrojanEat/graphs/contributors) who participated in this project.

## Acknowledgements

This project was developed by, is maintained by, and is sponsored by Shixiang (Adam) Yang all independently. It incorporates extensive feedback from many USC students to mention here, including many contributors who have helped to design UI, LOGO, and contribute great ideas, and so on.

This project is largely based on the menu released by [USC Dining](https://hospitality.usc.edu/residential-dining-menus/) and the translation for is primarily based on [pygtrans](https://pypi.org/project/pygtrans/1.0.5/). There might be some bugs and inappropriate translations leading unpleasant experience, please kindly inform me if it happens and everyone is welcome to contribute.

## License

[MIT License](https://andreasonny.mit-license.org/2019) © Shixiang Yang

[node.js]: https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=Node.js
[node-url]: https://nodejs.org/en/
[javascript.js]: https://img.shields.io/badge/Javascript-20232A?style=for-the-badge&logo=JavaScript
[javascript-url]: https://www.javascript.com/
[express.js]: https://img.shields.io/badge/Express.js-35495E?style=for-the-badge&logo=JavaScript
[express-url]: https://expressjs.com/
[mysql]: https://img.shields.io/badge/MySQL-DD0031?style=for-the-badge&logo=mysql&color=white
[mysql-url]: https://www.mysql.com/
[html]: https://img.shields.io/badge/HTML5-4A4A55?style=for-the-badge&logo=html5
[html-url]: https://html.com/html5/
[css]: https://img.shields.io/badge/CSS3-FF2D20?style=for-the-badge&logo=css3
[css-url]: https://www.w3.org/Style/CSS/Overview.en.html
[postman]: https://img.shields.io/badge/Postman-563D7C?style=for-the-badge&logo=postman&logoColor=white
[postman-url]: https://www.postman.com/
[heroku]: https://img.shields.io/badge/heroku-0769AD?style=for-the-badge&logo=heroku
[heroku-url]: https://dashboard.heroku.com/login
[python]: https://img.shields.io/badge/python-0769AD?style=for-the-badge&logo=python&color=grey
[python-url]: https://www.python.org/
[contributors-shield]: https://img.shields.io/github/contributors/AdamYang1/TrojanEat.svg?style=flat
[contributors-url]: https://github.com/AdamYang1/TrojanEat/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AdamYang1/TrojanEat?style=flat
[forks-url]: https://github.com/AdamYang1/TrojanEat/network/members
[stars-shield]: https://img.shields.io/github/stars/AdamYang1/TrojanEat.svg?style=flat
[stars-url]: https://github.com/AdamYang1/TrojanEat/stargazers
[issues-shield]: https://img.shields.io/github/issues/AdamYang1/TrojanEat.svg?style=flat
[issues-url]: https://github.com/AdamYang1/TrojanEat/issues
[license-shield]: https://img.shields.io/github/license/AdamYang1/TrojanEat.svg?style=flat
[license-url]: https://github.com/AdamYang1/TrojanEat/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=social&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/shixiang-yang-60b46a219/
[figma]: https://img.shields.io/badge?style=for-the-badge&logo=figma
[figma-url]: https://www.figma.com/
