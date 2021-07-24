> yarn.lock deduplication

```yml
name: yarn.lock deduplication

on:
  push:
    branches:
      - master
      - main
      - next
      - canary

jobs:
  build:
    runs-on: ubuntu-latest
    #if: "contains(github.event.head_commit.message, '[skip ci]')"
    steps:
      - name: yarn.lock deduplication
        uses: bluelovers/action-yarnlock-dedupe@master
      - name: echo
        run: |
          git add ./yarn.lock
          git commit -m "chore(deps): yarn.lock deduplication" ./yarn.lock
```
