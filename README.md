# Harvest CLI

[![CI](https://github.com/bertdeblock/harvest-cli/workflows/CI/badge.svg)](https://github.com/bertdeblock/harvest-cli/actions?query=workflow%3ACI)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Super simple Harvest CLI tool.

## Commands

- [start](#start)
- [stop](#stop)
- [cancel](#cancel)
- [resume](#resume)
- [last](#last)
- [open](#open)

### start

Start a new time entry:

```shell
hv start
```

### stop

Stop the last running time entry:

```shell
hv stop
```

### cancel

Cancel the last running time entry:

```shell
hv cancel
```

### resume

Resume the last stopped time entry:

```shell
hv resume
```

### last

Get info about the last time entries:

```shell
hv last <amount>
```

### open

Open the Harvest time entries page:

```shell
hv open
```
