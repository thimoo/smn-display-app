# SwissMetNet Display Application

This application allows to display meteorological data for a display terminal. The display can be oriented landscape or portrait.

The application needs the web service available [here](https://github.com/thimoo/smn-display-api).

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Build on server

To deploy the projet on a development server, run :

```bash
npm install
bower install
bower prune
grunt build:dist
```
The command `grunt build:dist` build a compact version of the application.

## Application structure

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular).
