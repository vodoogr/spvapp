"use client";

import dynamic from "next/dynamic";
import { Box, useToken } from "@chakra-ui/react";
import type { Layout, PlotData } from "plotly.js";

const Plot = dynamic(
  async () => {
    const [{ default: createPlotlyComponent }, { default: PlotlyBasic }] = await Promise.all([
      import("react-plotly.js/factory"),
      import("plotly.js-basic-dist-min"),
    ]);

    return createPlotlyComponent(PlotlyBasic);
  },
  { ssr: false },
);

export function PlotlyClient({
  data,
  layout,
  height = 300,
}: {
  data: Partial<PlotData>[];
  layout?: Partial<Layout>;
  height?: number;
}) {
  const [blue, grid, text] = useToken("colors", ["blue.600", "blue.100", "gray.700"]);

  return (
    <Box h={`${height}px`} w="100%">
      <Plot
        data={data}
        layout={{
          autosize: true,
          height,
          margin: { l: 42, r: 18, t: 14, b: 38 },
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          font: { color: text, family: "Geist, sans-serif" },
          xaxis: { gridcolor: grid, zerolinecolor: grid },
          yaxis: { gridcolor: grid, zerolinecolor: grid },
          colorway: [blue, "#1d4ed8", "#38bdf8", "#0f172a", "#f59e0b"],
          ...layout,
        }}
        config={{ displayModeBar: false, responsive: true }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler
      />
    </Box>
  );
}
