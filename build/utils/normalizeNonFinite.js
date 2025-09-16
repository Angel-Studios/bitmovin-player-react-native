export function normalizeNonFinite(input) {
    const sentinelPrefix = 'BMP_';
    function walk(v) {
        if (v === `${sentinelPrefix}Infinity`)
            return Infinity;
        if (v === `${sentinelPrefix}-Infinity`)
            return -Infinity;
        if (v === `${sentinelPrefix}NaN`)
            return NaN;
        if (Array.isArray(v))
            return v.map(walk);
        if (v && typeof v === 'object') {
            const out = {};
            for (const k of Object.keys(v))
                out[k] = walk(v[k]);
            return out;
        }
        return v;
    }
    return walk(input);
}
//# sourceMappingURL=normalizeNonFinite.js.map