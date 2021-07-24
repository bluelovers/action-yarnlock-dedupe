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
      - name: commit yarn.lock
        run: |
          git add ./yarn.lock
          git commit -m "chore(deps): yarn.lock deduplication" ./yarn.lock
      - name: Push changes
        if: success()
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```
