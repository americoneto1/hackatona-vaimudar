Aplicação de controle de manifestações
==================

## Objetivo da aplicação

Fomentar a organização de protestos, através da divulgação e organização por temas específicos.

Manifestações podem ser visualizadas de acordo com a busca realizada. Elas podem ser criadas indicando o ponto de encontro com auxílio de auto completar para facilitar e padronizar endereços assim como no próprio campo de busca por manifestações. 

Para cada manifestação é possível compartilhar no Twitter sendo contra ou a favor e na própria manifestação estes dados são computados, possibilitando maior confiabilidade.

A príncipio todas as manifestações criadas já estão sendo apresentadas na aplicação, mas no futuro seria criado um módulo administrativo para aprovação. A ideia de não precisar de cadastrar, torna o aplicativo mais simples e promove o anonimato.

A aplicação pode ser visualizada em telas menores, como tablets e smartphones, pois segue padrões de web responsive.

## Manutenabilidade

A aplicação utiliza tecnologias modernas e conhecidas pelo mercado, facilitando o aprendizado técnico e manutenção.

## Configuração local

### Pré requisitos
 * NodeJS
 * Ruby
 * MongoDB

A aplicação utiliza o Yeoman generator, portanto é necessário rodar os seguintes comandos:

```bash
$ npm install grunt-cli -g
$ npm install bower -g
$ gem install compass
$ npm install
$ bower install
$ grunt serve
```
