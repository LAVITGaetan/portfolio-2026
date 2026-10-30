export type BrightnessGrid = number[][];

/** Sparse to dense. Symbols only: letters make the portrait read as text. */
const CHARSET = " .·:-=+*#%@";
/** A DM Mono glyph is 0.6em wide for a 1em line: sample fewer rows to keep proportions. */
const CHAR_ASPECT = 0.6;
/** Below 1, lifts mid-tones so the face doesn't drown in dense glyphs. */
const GAMMA = 0.8;
/** How much contours (hair strands, jaw, eyes) are reinforced on top of the shading. */
const EDGE_WEIGHT = 0.4;
const SCAN_PERIOD = 3000;
const SCAN_BAND_HEIGHT = 8;
const SCAN_BOOST = 0.3;

function readLuminance(image: HTMLImageElement, columns: number, rows: number): Float32Array | null {
    const canvas = document.createElement("canvas");
    canvas.width = columns;
    canvas.height = rows;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return null;

    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, columns, rows);
    const { data } = context.getImageData(0, 0, columns, rows);

    return Float32Array.from({ length: columns * rows }, (_, cell) => {
        const index = cell * 4;
        return (0.2126 * data[index] + 0.7152 * data[index + 1] + 0.0722 * data[index + 2]) / 255;
    });
}

/** Sobel gradient magnitude (0–1) around a cell. */
function edgeStrength(luminance: Float32Array, columns: number, rows: number, column: number, row: number): number {
    const at = (x: number, y: number) =>
        luminance[Math.min(Math.max(y, 0), rows - 1) * columns + Math.min(Math.max(x, 0), columns - 1)];
    const horizontal =
        at(column + 1, row - 1) + 2 * at(column + 1, row) + at(column + 1, row + 1) -
        at(column - 1, row - 1) - 2 * at(column - 1, row) - at(column - 1, row + 1);
    const vertical =
        at(column - 1, row + 1) + 2 * at(column, row + 1) + at(column + 1, row + 1) -
        at(column - 1, row - 1) - 2 * at(column, row - 1) - at(column + 1, row - 1);
    return Math.min(Math.hypot(horizontal, vertical) / 4, 1);
}

/** Reduces the image to a grid of ink density (0–1). Cells brighter than `threshold` count as background. */
export function sampleBrightness(image: HTMLImageElement, columns: number, threshold: number): BrightnessGrid {
    const rows = Math.round((image.height / image.width) * columns * CHAR_ASPECT);
    const luminance = readLuminance(image, columns, rows);
    if (!luminance) return [];

    // Stretches the foreground's range so even a low-contrast picture uses the whole charset.
    const darkest = luminance.reduce((minimum, value) => Math.min(minimum, value), threshold);
    const range = Math.max(threshold - darkest, 0.01);

    return Array.from({ length: rows }, (_, row) =>
        Array.from({ length: columns }, (_, column) => {
            const value = luminance[row * columns + column];
            if (value >= threshold) return 0;
            const ink = ((threshold - value) / range) ** GAMMA;
            return Math.min(ink + edgeStrength(luminance, columns, rows, column, row) * EDGE_WEIGHT, 1);
        }),
    );
}

/** Draws the grid with a light band sweeping from top to bottom. */
export function renderScanFrame(grid: BrightnessGrid, time: number): string {
    const bandRow = ((time % SCAN_PERIOD) / SCAN_PERIOD) * (grid.length + SCAN_BAND_HEIGHT * 2) - SCAN_BAND_HEIGHT;

    return grid
        .map((cells, row) => {
            const boost = Math.max(0, 1 - Math.abs(row - bandRow) / SCAN_BAND_HEIGHT) * SCAN_BOOST;
            return cells
                .map((value) => (value === 0 ? " " : CHARSET[Math.round(Math.min(value + boost, 1) * (CHARSET.length - 1))]))
                .join("");
        })
        .join("\n");
}
