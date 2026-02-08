## Mosaic Pattern Generator

**Description**
- Upload any image and generate a mosaic chart from it.

### Mosaic Pattern Charts
B = back loop single crochet. (differs outside the united states)
F = front loop double crochet. (differs outside the united states)

**How to read a mosaic chart**
- 2 options for mosaic chart box (B or F). usually denoted with an X.
- foundation row starts the chart.
- each box represents 1 stitch.
- rows read bottom -> top.
- "SC" or single crochet is usually at the first and last stitch.
- row should be annotated with desired color.
- each box represents 1 stitch.
- tinted color does not represent how you should stitch.
- only concerned w/ row color and whether the box has an X or not.
- chart represents what the chart will look like when its finished not while your working on it.
- mosaic charts are read right -> left for right handed people and left -> right for left handed people.
- the first column and the last column are color coded w/ the required row color.
- colors are never switched mid row in mosaic crochet.
- first 2 rows are often single crochet's indicating the pattern has not started yet.

### Implementation Notes
- users will choose stitch count (width in stitches).
- height will be dynamically determine via the aspect ratio.
- empty box will be SC (B), crossed box will be DC (F).

### User Flow
- user uploads an image.
- user adjusts aspect ratio to desired stitch count.
- user set's configuration settings for chart. TBD.
- chart is generated and displayed to user.
- users may export chart to PDF or CSV.

### Architecture
**Client**
- Image picker / upload (remains local on each client.)
- Chart generation engine.
- Chart exporter.

### TODO
- add a key indicating empty box is SC and crossed box is DS.
- handle border stitches at begginning vs at end of row.
- add row count on the right side of the chart. (or left maybe make it configurable?) (right handed vs left handed configuration?)
- handle repeated patterns in single row. w/ border stitches at each end.
- handle interactively moving through the chart, similar to how a post it note would be used in a piece of paper.
    - tutorial mode
    - save progress
- support inset mosaic charts (first pass will only support overlay)



**Server**
- User authentication.
- User pattern retention.
- Entitlements.
