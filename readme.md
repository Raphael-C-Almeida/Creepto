# Creepto

Creepto é uma demonstração de ransomware para a disciplina de Segurança do departamento de ciência da computação da UFRJ (Universidade Federal do Rio de Janeiro)

#### Objetivos
  - Mostrar um programa capaz de criptografar arquivos contra a vontade usuário afim de cobrar um resgate

#### Componentes
  - **creepto.js** - Arquivo principal, responsável por criptografar arquivos com determinadas extensões dentro de um determinado diretório
  - **decreepto.js** - Arquivo com código responsável por descriptografar determinado arquivo

#### Tecnologia
  - Os scripts foram escritos em NodeJS usando ES6.

#### Requisitos
  - [Node.js](https://nodejs.org/) (6 ou superior)
  - NPM

#### Bibliotecas
| Nome | Link |
| ------ | ------ |
| Crypto | [Gozala/crypto](https://github.com/Gozala/crypto) |
| Walk | [Daplie/node-walk](https://github.com/Daplie/node-walk) |

## Instalação
```sh
$ git clone https://github.com/Raphael-C-Almeida/Creepto.git
$ npm install
```

## Uso
Creepto:
```sh
$ node ./creepto.js
```

Decreepto:
```sh
$ node ./decreepto.js "filename"
```

## Configurações
Creepto:
| Propriedade | Configuração Padrão | Comportamento
| ------ | ------ | ------ |
| encryptionAlgorithm | 'aes-256-ctr' | Tipo de criptografia usada |
| targetFolder | './TestFiles/' | Pasta alvo do ransomware |
| ignoreListFilePath | '.ignoreList' | Local e nome do arquivo usado para guardar quais arquivos foram afetados |
| key | '$myvirus_sample_encryption_key!!' | Chave de criptografia |
| targetExtensions | ['txt', 'png', 'gif', 'jpg', 'pdf'] | Extenções alvo do script |
| ignoreList | [] | Arquivos que serão ignorados pelo script |
Decreepto:
| Propriedade | Configuração Padrão | Comportamento
| ------ | ------ | ------ |
| encryptionAlgorithm | 'aes-256-ctr' | Tipo de criptografia usada |
| key | '$myvirus_sample_encryption_key!!' | Chave de criptografia |

## Aluno
Raphael de Carvalho Almeida - 114063859

License
----

MIT
