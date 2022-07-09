[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)
[![OSCS Status](https://www.oscs1024.com/platform/badge/AdamYang1/TrojanEat.svg?size=small)](https://www.oscs1024.com/project/AdamYang1/TrojanEat?ref=badge_small)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![wxml: html](https://img.shields.io/badge/HTML-wxml-green.svg?style=flat-square)](https://github.com/prettier/prettier)

# TrojanEat

> This is a USC dining hall recommendation application specifically targeting Chinese Freshman who are likely to have hard time reading menus. Users will be asked to pick their favourite types of food and will receive recommendation dining hall accordingly.

## Important Note

This is an application deployed on WeChat-based environment. Therefore, you have to install [WeChat](https://www.wechat.com/) on your phone to use this application. Nevertheless, you are welcome to test the server using APIs.

Even though it is designed for USC Chinese student, everyone is welcome to use the app and contribute to the app.

## Prerequisites

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

- [TrojanEat](#trojaneat)
  - [Important Note](#important-note)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Serving the app](#serving-the-app)
  - [API](#api)
    - [useBasicFetch](#usebasicfetch)
      - [Options](#options)
  - [Contributing](#contributing)
    - [Built With](#built-with)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/AdamYang1/TrojanEat.git
$ cd TrojanEat
```

To install and set up the library, run:

```sh
$ npm install
```

## Usage

### Serving the app

```sh
$ npm start
```

## API

### useBasicFetch

```js
useBasicFetch((url: string = ""), (delay: number = 0));
```

Supported options and result fields for the `useBasicFetch` hook are listed below.

#### Options

`url`

| Type   | Default value |
| ------ | ------------- |
| string | ''            |

If present, the request will be performed as soon as the component is mounted

Example:

```tsx
const MyComponent: React.FC = () => {
	const { data, error, loading } = useBasicFetch(
		"https://api.icndb.com/jokes/random"
	);

	if (error) {
		return <p>Error</p>;
	}

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="App">
			<h2>Chuck Norris Joke of the day</h2>
			{data && data.value && <p>{data.value.joke}</p>}
		</div>
	);
};
```

`delay`

| Type   | Default value | Description          |
| ------ | ------------- | -------------------- |
| number | 0             | Time in milliseconds |

If present, the request will be delayed by the given amount of time

Example:

```tsx
type Joke = {
	value: {
		id: number;
		joke: string;
	};
};

const MyComponent: React.FC = () => {
	const { data, error, loading } = useBasicFetch<Joke>(
		"https://api.icndb.com/jokes/random",
		2000
	);

	if (error) {
		return <p>Error</p>;
	}

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="App">
			<h2>Chuck Norris Joke of the day</h2>
			{data && data.value && <p>{data.value.joke}</p>}
		</div>
	);
};
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

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
- [![Javascript][javascript.js]][javascript-url]
- [![mysql][mysql]][mysql-url]
- [![html][html]][html-url]
- [![css][css]][css-url]
- [![postman][postman]][postman-url]
- [![heroku][heroku]][heroku-url]
- [![python][python]][python-url]

<p align="right">(<a href="#top">back to top</a>)</p>

## Authors

- **Adam Yang** - _Initial & Entire work_ - [AdamYang](https://github.com/AdamYang1)

See also the list of [contributors](https://github.com/AdamYang1/TrojanEat/graphs/contributors) who participated in this project.

## License

[MIT License](https://andreasonny.mit-license.org/2019) © Andrea SonnY

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
[python]: https://img.shields.io/badge/python-0769AD?style=for-the-badge&logo=python&color=white
[python-url]: https://www.python.org/
