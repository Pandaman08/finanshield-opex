import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { fixedCost, variableCost, price, quantity } = await req.json();

  if (price <= variableCost) {
    return NextResponse.json(
      { error: "El precio debe ser mayor al costo variable" },
      { status: 400 }
    );
  }

  const margin = price - variableCost;
  const breakEven = fixedCost / margin;
  const contribution = margin * quantity;
  const profit = contribution - fixedCost;
  const gao = contribution / profit;

  let risk = 50;
  if (gao > 4) risk += 30;
  if (quantity < breakEven) risk += 20;
  risk = Math.min(risk, 100);

  return NextResponse.json({
    margin,
    breakEven,
    profit,
    gao,
    risk,
  });
}
