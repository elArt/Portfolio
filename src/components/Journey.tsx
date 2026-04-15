import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'

const BASE_W = 1200
const VP_H = 560
const BASE_GY = 460
const BASE_CHAR_SX = 300
const WORLD_W = 7500

const LM = { kinder: 1100, school: 2300, uni: 3400, metro: 4450, constr: 5300, loopme: 6200, next: 7050 }

const yp = (year: number) => (year - 1990) / 36

type Stage = 'baby' | 'child' | 'schoolkid' | 'student' | 'metro' | 'worker' | 'engineer' | 'developer'

const STAGES: { stage: Stage; from: number; to: number }[] = [
  { stage: 'baby', from: yp(1990), to: yp(1993) },
  { stage: 'child', from: yp(1993), to: yp(1997) },
  { stage: 'schoolkid', from: yp(1997), to: yp(2007) },
  { stage: 'student', from: yp(2007), to: yp(2012) },
  { stage: 'metro', from: yp(2012), to: yp(2015) },
  { stage: 'worker', from: yp(2015), to: yp(2018) },
  { stage: 'engineer', from: yp(2018), to: yp(2021) },
  { stage: 'developer', from: yp(2021), to: yp(2026) },
]
function getStage(p: number): Stage { for (const s of STAGES) if (p >= s.from && p < s.to) return s.stage; return 'developer' }
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

const SKIN = '#F4A460', HAIR = '#3D2B1F'
const SHIRT: Record<Stage, string> = { baby: '#B0C4DE', child: '#6FA8DC', schoolkid: '#4A86C8', student: '#6B8FA8', metro: '#2C3E50', worker: '#E8A000', engineer: '#3A5F8A', developer: '#1A1A2E' }
const PANTS: Record<Stage, string> = { baby: '#B0C4DE', child: '#2C3E50', schoolkid: '#1C2B3A', student: '#3A3A5C', metro: '#1C2B3A', worker: '#5A4A2A', engineer: '#1C2B3A', developer: '#1C2B3A' }

interface CP { stage: Stage; walkPhase: number; wx: number; gy: number; yOffset?: number; progress: number }
function Character({ stage, walkPhase, wx, gy, yOffset = 0, progress }: CP) {
  const sw = Math.sin(walkPhase), hop = stage === 'baby' ? 0 : Math.abs(sw) * -4
  const sizes: Record<Stage, { h: number; hw: number }> = { baby: { h: 28, hw: 20 }, child: { h: 42, hw: 14 }, schoolkid: { h: 50, hw: 16 }, student: { h: 55, hw: 17 }, metro: { h: 56, hw: 17 }, worker: { h: 56, hw: 17 }, engineer: { h: 58, hw: 18 }, developer: { h: 58, hw: 18 } }
  const { h, hw } = sizes[stage], baseY = gy - h + hop + yOffset
  const hat = stage === 'worker' ? '#F5C518' : stage === 'engineer' ? '#ffffff' : 'none'

  if (stage === 'baby') {
    const arm = sw * 12
    const by = gy - 6 + yOffset
    return (<g>
      <ellipse cx={wx} cy={by - 8} rx={18} ry={11} fill={SHIRT.baby} />
      <circle cx={wx + 18} cy={by - 18} r={10} fill={SKIN} />
      <circle cx={wx + 21} cy={by - 19} r={1} fill="#333" />
      <line x1={wx + 10} y1={by - 8} x2={wx + 10 + arm * .35} y2={by + 2} stroke={PANTS.baby} strokeWidth={5} strokeLinecap="round" />
      <line x1={wx - 10} y1={by - 8} x2={wx - 10 - arm * .35} y2={by + 2} stroke={PANTS.baby} strokeWidth={5} strokeLinecap="round" />
      <line x1={wx - 12} y1={by - 4} x2={wx - 12 - arm * .25} y2={by + 6} stroke={PANTS.baby} strokeWidth={6} strokeLinecap="round" />
      <line x1={wx + 4} y1={by - 2} x2={wx + 4 + arm * .25} y2={by + 6} stroke={PANTS.baby} strokeWidth={6} strokeLinecap="round" />
    </g>)
  }

  if (stage === 'student') {
    const aR = sw * 14
    const bookSwing = Math.sin(walkPhase + 0.5) * 8
    return (<g>
      <line x1={wx + hw / 2} y1={baseY + h - 12} x2={wx + hw / 2 + Math.sin(walkPhase + .3) * 11} y2={baseY + h + Math.cos(Math.abs(sw) * Math.PI) * 2 - 2} stroke={PANTS.student} strokeWidth={7} strokeLinecap="round" />
      <line x1={wx + hw / 2} y1={baseY + h - 12} x2={wx + hw / 2 - Math.sin(walkPhase + .3) * 11} y2={baseY + h + Math.cos(Math.abs(-sw) * Math.PI) * 2 - 2} stroke={PANTS.student} strokeWidth={7} strokeLinecap="round" />
      <rect x={wx} y={baseY + h * .35} width={hw} height={h * .42} rx={3} fill={SHIRT.student} />
      <line x1={wx + hw} y1={baseY + h * .40} x2={wx + hw + aR * .6 + 4} y2={baseY + h * .63} stroke={SKIN} strokeWidth={5} strokeLinecap="round" />
      <line x1={wx} y1={baseY + h * .40} x2={wx - 8 + bookSwing * .3} y2={baseY + h * .60} stroke={SKIN} strokeWidth={5} strokeLinecap="round" />
      <rect x={wx - 16 + bookSwing * .3} y={baseY + h * .58} width={18} height={12} rx={2} fill="#E8D5A3" stroke="#C4A96A" strokeWidth={1} />
      <rect x={wx + hw / 2 - 3} y={baseY + h * .27} width={6} height={h * .10} fill={SKIN} />
      <circle cx={wx + hw / 2} cy={baseY + h * .20} r={h * .22} fill={SKIN} />
      <rect x={wx + hw / 2 - h * .22} y={baseY + h * .20 - h * .22} width={h * .44} height={h * .17} rx={h * .10} fill={HAIR} />
      <circle cx={wx + hw / 2 - 3} cy={baseY + h * .18} r={1.2} fill="#333" />
      <circle cx={wx + hw / 2 + 3} cy={baseY + h * .18} r={1.2} fill="#333" />
    </g>)
  }

  if (stage === 'developer') {
    const tp = progress * 120 * Math.PI * 2, hY = Math.sin(tp * 2) * 3, hY2 = Math.sin(tp * 2 + 1.2) * 3
    const cx = wx + hw / 2, sY2 = gy - 38, bTop = sY2 - 45, hCY = bTop - 10
    const dY = sY2 - 22, sH = 42, sW = hw + 22, sX = wx - 5, sYt = dY - 5 - sH
    return (<g>
      <rect x={cx - 22} y={sY2 - 55} width={6} height={60} rx={3} fill="#2a2a2a" />
      <rect x={cx + 16} y={sY2 - 55} width={6} height={60} rx={3} fill="#2a2a2a" />
      <rect x={cx - 22} y={sY2 - 55} width={44} height={6} rx={3} fill="#2a2a2a" />
      <rect x={cx - 22} y={sY2 - 35} width={44} height={4} rx={2} fill="#333" />
      <rect x={cx - 22} y={sY2} width={44} height={6} rx={3} fill="#2a2a2a" />
      <line x1={cx - 18} y1={sY2 + 6} x2={cx - 20} y2={gy} stroke="#222" strokeWidth={3} />
      <line x1={cx + 18} y1={sY2 + 6} x2={cx + 20} y2={gy} stroke="#222" strokeWidth={3} />
      <line x1={cx - 4} y1={sY2 + 2} x2={cx - 24} y2={sY2 + 2} stroke={PANTS.developer} strokeWidth={9} strokeLinecap="round" />
      <line x1={cx - 24} y1={sY2 + 2} x2={cx - 24} y2={gy} stroke={PANTS.developer} strokeWidth={8} strokeLinecap="round" />
      <rect x={cx - 32} y={gy - 5} width={16} height={6} rx={3} fill="#111" />
      <line x1={cx + 4} y1={sY2 + 2} x2={cx + 24} y2={sY2 + 2} stroke={PANTS.developer} strokeWidth={9} strokeLinecap="round" />
      <line x1={cx + 24} y1={sY2 + 2} x2={cx + 24} y2={gy} stroke={PANTS.developer} strokeWidth={8} strokeLinecap="round" />
      <rect x={cx + 16} y={gy - 5} width={16} height={6} rx={3} fill="#111" />
      <rect x={wx} y={bTop} width={hw} height={46} rx={4} fill={SHIRT.developer} />
      <line x1={wx + 2} y1={bTop + 12} x2={sX + 8} y2={dY - 6 + hY} stroke={SKIN} strokeWidth={5} strokeLinecap="round" />
      <circle cx={sX + 8} cy={dY - 4 + hY} r={4} fill={SKIN} />
      <line x1={wx + hw - 2} y1={bTop + 12} x2={sX + sW - 8} y2={dY - 6 + hY2} stroke={SKIN} strokeWidth={5} strokeLinecap="round" />
      <circle cx={sX + sW - 8} cy={dY - 4 + hY2} r={4} fill={SKIN} />
      <rect x={cx - 3} y={hCY + 8} width={6} height={8} fill={SKIN} />
      <circle cx={cx} cy={hCY} r={10} fill={SKIN} />
      <rect x={cx - 10} y={hCY - 10} width={20} height={8} rx={4} fill={HAIR} />
      <circle cx={cx - 3} cy={hCY + 1} r={1.3} fill="#333" />
      <circle cx={cx + 3} cy={hCY + 1} r={1.3} fill="#333" />
      <rect x={wx - 40} y={dY} width={hw + 80} height={8} rx={3} fill="#4A3728" />
      <rect x={wx - 40} y={dY + 8} width={hw + 80} height={3} rx={1} fill="#3a2a1a" />
      <rect x={sX} y={dY - 11} width={sW} height={8} rx={3} fill="#1c1c1c" />
      {[0, 1, 2].map(r => [0, 1, 2, 3, 4, 5].map(c => (<rect key={`${r}-${c}`} x={sX + 6 + c * 10} y={dY - 9 + r * 2.5} width={8} height={2} rx={.5} fill="#333" />)))}
      <rect x={sX} y={sYt + sH - 3} width={sW} height={4} rx={2} fill="#111" />
      <rect x={sX} y={sYt} width={sW} height={sH} rx={4} fill="#1A1A2E" />
      <rect x={sX + 2} y={sYt + 2} width={sW - 4} height={sH - 4} rx={2} fill="#0a0a2a" />
      {[0, 1, 2, 3].map(i => (<rect key={i} x={sX + 6} y={sYt + 7 + i * 8} width={Math.max(4, 18 + Math.sin(tp * .05 + i * 1.7) * 14)} height={3} rx={1} fill={i % 2 === 0 ? '#4FC3F7' : '#7986CB'} opacity={0.7} />))}
    </g>)
  }

  const aL = -sw * 14, aR = sw * 14
  return (<g>
    <line x1={wx + hw / 2} y1={baseY + h - 12} x2={wx + hw / 2 + Math.sin(walkPhase + .3) * 11} y2={baseY + h + Math.cos(Math.abs(sw) * Math.PI) * 2 - 2} stroke={PANTS[stage]} strokeWidth={7} strokeLinecap="round" />
    <line x1={wx + hw / 2} y1={baseY + h - 12} x2={wx + hw / 2 - Math.sin(walkPhase + .3) * 11} y2={baseY + h + Math.cos(Math.abs(-sw) * Math.PI) * 2 - 2} stroke={PANTS[stage]} strokeWidth={7} strokeLinecap="round" />
    <rect x={wx} y={baseY + h * .35} width={hw} height={h * .42} rx={3} fill={SHIRT[stage]} />
    {stage === 'schoolkid' && <rect x={wx - 9} y={baseY + h * .37} width={9} height={17} rx={3} fill="#8B4513" />}
    {stage === 'metro' && <><rect x={wx - 1} y={baseY + h * .35} width={5} height={14} rx={1} fill="#1A252F" /><rect x={wx + hw - 4} y={baseY + h * .35} width={5} height={14} rx={1} fill="#1A252F" /></>}
    <line x1={wx} y1={baseY + h * .40} x2={wx + aL * .6 - 4} y2={baseY + h * .63} stroke={SKIN} strokeWidth={5} strokeLinecap="round" />
    <line x1={wx + hw} y1={baseY + h * .40} x2={wx + hw + aR * .6 + 4} y2={baseY + h * .63} stroke={SKIN} strokeWidth={5} strokeLinecap="round" />
    <rect x={wx + hw / 2 - 3} y={baseY + h * .27} width={6} height={h * .10} fill={SKIN} />
    <circle cx={wx + hw / 2} cy={baseY + h * .20} r={h * .22} fill={SKIN} />
    <rect x={wx + hw / 2 - h * .22} y={baseY + h * .20 - h * .22} width={h * .44} height={h * .15} rx={h * .10} fill={HAIR} />
    <circle cx={wx + hw / 2 - 3} cy={baseY + h * .18} r={1.2} fill="#333" />
    <circle cx={wx + hw / 2 + 3} cy={baseY + h * .18} r={1.2} fill="#333" />
    {(stage === 'worker' || stage === 'engineer') && <><ellipse cx={wx + hw / 2} cy={baseY + h * .20 - h * .19} rx={h * .30} ry={h * .09} fill={hat} /><rect x={wx + hw / 2 - h * .22} y={baseY + h * .20 - h * .23} width={h * .44} height={h * .11} rx={3} fill={hat} /></>}
    {stage === 'metro' && <><ellipse cx={wx + hw / 2} cy={baseY + h * .20 - h * .20} rx={h * .30} ry={h * .08} fill="#1A252F" /><rect x={wx + hw / 2 - h * .22} y={baseY + h * .20 - h * .25} width={h * .38} height={h * .09} rx={2} fill="#2C3E50" /></>}
  </g>)
}

function Ground({ vx, gy }: { vx: number; gy: number }) { return (<><rect x={vx} y={gy} width={WORLD_W} height={VP_H - gy + 20} fill="#161616" /><line x1={vx} y1={gy} x2={vx + WORLD_W} y2={gy} stroke="#2a2a2a" strokeWidth={1} />{Array.from({ length: 20 }, (_, i) => (<rect key={i} x={vx + i * 200} y={gy + 8} width={110} height={3} rx={1} fill="#1e1e1e" />))}</>) }
function Sky({ vx }: { vx: number }) { return <rect x={vx} y={0} width={WORLD_W} height={VP_H} fill="url(#skyGrad)" /> }

function YearTag({ wx, gy, year }: { wx: number; gy: number; year: number }) {
  return (<g>
    <rect x={wx - 24} y={gy - 122} width={48} height={20} rx={4} fill="#000" opacity={0.5} />
    <text x={wx} y={gy - 108} fontFamily="monospace" fontSize={12} fontWeight={700}
      fill="#d8d8d8" textAnchor="middle" letterSpacing={1.5}>{year}</text>
  </g>)
}

function BL({ x, y, text, sub, sm }: { x: number; y: number; text: string; sub?: string; sm: boolean }) {
  const fs = sm ? 10 : 12, fss = sm ? 8 : 10
  return (<g>
    <text x={x} y={y} fontFamily="'Inter',sans-serif" fontSize={fs} fontWeight={600}
      fill="#e8e8e8" textAnchor="middle" letterSpacing={0.3}>{text}</text>
    {sub && !sm && (<>
      <text x={x} y={y + fss + 8} fontFamily="'Inter',sans-serif" fontSize={fss} fontWeight={400}
        fill="#b0b0b0" textAnchor="middle" letterSpacing={0.2}>{sub}</text>
    </>)}
  </g>)
}

function DevText({ vx, gy: _gy, sm }: { vx: number; gy: number; sm: boolean }) {
  return (<g>
    <text x={vx + 60} y={36} fontFamily="'Inter',sans-serif" fontSize={sm ? 9 : 11} fontWeight={500} fill="#fff" opacity={0.15} letterSpacing={8}>JOURNEY</text>
  </g>)
}

function BirthO({ p, vx, gy, sm }: { p: number; vx: number; gy: number; sm: boolean }) {
  if (p > 0.12) return null
  const e = clamp(p / 0.12, 0, 1), fs = sm ? 72 : 108
  const ox = vx + 60 + fs * .57 * 4.8, oy = gy - 60 - fs * .5
  const r = sm ? 27 : 40, c = 2 * Math.PI * r
  return <circle cx={ox} cy={oy} r={r} fill="none" stroke="#4A90D9" strokeWidth={2} strokeDasharray={`${c * e} ${c}`} opacity={0.7 * (1 - e * .9)} />
}

function Kinder({ wx, gy, sm, label }: { wx: number; gy: number; sm: boolean; label: string }) {
  const x = wx, cx = x + 80
  return (<g>
    <rect x={x} y={gy - 120} width={160} height={120} fill="#7BAFD4" rx={2} />
    <polygon points={`${x - 10},${gy - 120} ${cx},${gy - 185} ${x + 170},${gy - 120}`} fill="#E07B54" />
    <rect x={x + 60} y={gy - 60} width={40} height={60} rx={3} fill="#5A3825" />
    <rect x={x + 20} y={gy - 100} width={30} height={30} rx={2} fill="#AED6F1" />
    <rect x={x + 110} y={gy - 100} width={30} height={30} rx={2} fill="#AED6F1" />
    <rect x={x - 30} y={gy - 35} width={8} height={35} fill="#5D4037" />
    <circle cx={x - 26} cy={gy - 55} r={24} fill="#2E7D32" opacity={0.9} />
    {Array.from({ length: 10 }, (_, i) => (<line key={i} x1={x - 60 + i * 14} y1={gy - 24} x2={x - 60 + i * 14} y2={gy} stroke="#8B6914" strokeWidth={3} />))}
    <line x1={x - 60} y1={gy - 24} x2={x + 76} y2={gy - 24} stroke="#8B6914" strokeWidth={2} />
    <BL x={cx} y={gy - 230} text={label} sm={sm} />
  </g>)
}

function School({ wx, gy, sm, label }: { wx: number; gy: number; sm: boolean; label: string }) {
  const x = wx, cx = x + 110
  return (<g>
    <rect x={x} y={gy - 170} width={220} height={170} fill="#CFD8DC" rx={2} />
    <rect x={x - 5} y={gy - 175} width={230} height={10} fill="#B0BEC5" />
    {[25, 85, 145, 195].map(i => (<rect key={i} x={x + i} y={gy - 168} width={10} height={168} fill="#ECEFF1" rx={1} />))}
    {[0, 1].map(row => [30, 92, 158].map(col => (<rect key={`${row}-${col}`} x={x + col} y={gy - 155 + row * 62} width={38} height={46} rx={2} fill="#AED6F1" opacity={0.7} />)))}
    <rect x={x + 90} y={gy - 75} width={40} height={75} rx={3} fill="#5D4037" />
    <line x1={x + 262} y1={gy} x2={x + 262} y2={gy - 134} stroke="#aaa" strokeWidth={2} />
    <rect x={x + 262} y={gy - 134} width={38} height={24} fill="#3498db" opacity={0.8} />
    <rect x={x + 70} y={gy - 16} width={80} height={8} rx={1} fill="#9E9E9E" />
    <rect x={x + 60} y={gy - 8} width={100} height={8} rx={1} fill="#BDBDBD" />
    <BL x={cx} y={gy - 250} text={label} sm={sm} />
  </g>)
}

function Uni({ wx, gy, progress, sm, label, labelSub }: { wx: number; gy: number; progress: number; sm: boolean; label: string; labelSub: string }) {
  const x = wx, cx = x + 130, on = progress > 0.38 && progress < 0.53, sp = progress * 80
  return (<g>
    <rect x={x} y={gy - 200} width={260} height={200} fill="#D7CCC8" rx={2} />
    {[20, 70, 140, 200, 232].map(i => (<rect key={i} x={x + i} y={gy - 198} width={12} height={198} fill="#EDE0D4" rx={1} />))}
    {[0, 1].map(row => [30, 105, 178].map(col => (<rect key={`${row}-${col}`} x={x + col} y={gy - 185 + row * 72} width={42} height={54} rx={2} fill="#AED6F1" opacity={0.6} />)))}
    <rect x={x + 108} y={gy - 80} width={44} height={80} rx={2} fill="#4A3728" />
    <rect x={x + 295} y={gy - 58} width={48} height={48} rx={4} fill="#37474F" />
    <circle cx={x + 319} cy={gy - 34} r={17} fill="none" stroke="#546E7A" strokeWidth={4} />
    <circle cx={x + 319} cy={gy - 34} r={6} fill="#78909C" />
    <ellipse cx={cx} cy={gy - 200} rx={70} ry={12} fill="#B0A090" />
    <ellipse cx={cx} cy={gy - 206} rx={50} ry={6} fill="#C9B8A8" />
    {on && Array.from({ length: 6 }, (_, i) => { const a = (sp * 3.5 + i * 60) * Math.PI / 180, sr = 24 + Math.sin(sp * .4 + i) * 8; return <line key={i} x1={x + 319} y1={gy - 34} x2={x + 319 + Math.cos(a) * sr} y2={gy - 34 + Math.sin(a) * sr} stroke="#FFD700" strokeWidth={1.5} opacity={0.9} strokeLinecap="round" /> })}
    <BL x={cx} y={gy - 300} text={label} sub={labelSub} sm={sm} />
  </g>)
}

function Metro({ wx, gy, sm, label }: { wx: number; gy: number; sm: boolean; label: string }) {
  const x = wx, cx = x + 95
  return (<g>
    <rect x={x} y={gy - 145} width={190} height={145} rx={2} fill="#37474F" />
    <rect x={x + 45} y={gy - 145} width={100} height={145} rx={50} fill="#263238" />
    <text x={x + 65} y={gy - 55} fontFamily="'Inter',sans-serif" fontSize={62} fontWeight={900} fill="#E53935">M</text>
    {[0, 1, 2, 3].map(i => (<rect key={i} x={x + 55 + i * 9} y={gy - 12 + i * 3} width={72 - i * 18} height={6} rx={1} fill="#546E7A" />))}
    <rect x={x + 210} y={gy - 52} width={8} height={52} fill="#546E7A" />
    <rect x={x + 232} y={gy - 52} width={8} height={52} fill="#546E7A" />
    <line x1={x + 210} y1={gy - 40} x2={x + 240} y2={gy - 40} stroke="#78909C" strokeWidth={3} />
    <BL x={cx} y={gy - 250} text={label} sm={sm} />
  </g>)
}

function Constr({ wx, gy }: { wx: number; gy: number }) {
  const x = wx
  return (<g>
    {[0, 1, 2].map(f => (<g key={f}><rect x={x + 20} y={gy - 105 - f * 58} width={165} height={52} fill="none" stroke="#5C4033" strokeWidth={3} /><line x1={x + 20} y1={gy - 105 - f * 58} x2={x + 185} y2={gy - 53 - f * 58} stroke="#5C4033" strokeWidth={1.5} opacity={0.4} /><line x1={x + 185} y1={gy - 105 - f * 58} x2={x + 20} y2={gy - 53 - f * 58} stroke="#5C4033" strokeWidth={1.5} opacity={0.4} /></g>))}
    <line x1={x + 230} y1={gy} x2={x + 230} y2={gy - 272} stroke="#E8A000" strokeWidth={7} />
    <line x1={x + 110} y1={gy - 272} x2={x + 325} y2={gy - 272} stroke="#E8A000" strokeWidth={6} />
    <rect x={x + 90} y={gy - 284} width={32} height={22} rx={2} fill="#B07000" />
    <line x1={x + 270} y1={gy - 272} x2={x + 270} y2={gy - 188} stroke="#888" strokeWidth={1.5} />
    <path d={`M${x + 264},${gy - 192} q6,-10 12,0`} fill="none" stroke="#888" strokeWidth={2} />
    {[0, 1].map(i => (<rect key={i} x={x + 18 + i * 96} y={gy - 210} width={6} height={210} fill="#7B5E57" rx={1} />))}
    <line x1={x + 18} y1={gy - 140} x2={x + 114} y2={gy - 140} stroke="#7B5E57" strokeWidth={3} />
    <line x1={x + 18} y1={gy - 65} x2={x + 114} y2={gy - 65} stroke="#7B5E57" strokeWidth={3} />
  </g>)
}

function LoopMe({ wx, gy }: { wx: number; gy: number }) {
  const x = wx
  return (<g>
    <rect x={x} y={gy - 225} width={205} height={225} rx={3} fill="#1A237E" opacity={0.85} />
    {[0, 1, 2, 3].map(col => [0, 1, 2, 3, 4].map(row => (<rect key={`${col}-${row}`} x={x + 15 + col * 48} y={gy - 215 + row * 44} width={36} height={34} rx={1} fill="#AED6F1" opacity={0.18 + (col + row) * .025} />)))}
    <rect x={x + 72} y={gy - 58} width={62} height={58} rx={2} fill="#0D1757" />
    <text x={x + 22} y={gy - 237} fontFamily="'Inter',sans-serif" fontSize={20} fontWeight={700} fill="#4FC3F7" letterSpacing={1}>LoopMe</text>
  </g>)
}

function Next() {
  return (<g></g>)
}

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [screenW, setScreenW] = useState(() => typeof window !== 'undefined' ? window.innerWidth : BASE_W)
  const { t } = useLang()

  useEffect(() => {
    const fn = () => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(), s = el.offsetHeight - window.innerHeight; setProgress(clamp(-r.top / s, 0, 1)) }
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = () => setScreenW(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  const sm = screenW < 768
  const VP_W = sm ? 500 : BASE_W
  const GY = BASE_GY
  const CHAR_SX = sm ? 120 : BASE_CHAR_SX

  const stage = getStage(progress)
  const walkPhase = progress * 60 * Math.PI * 2
  const vx = progress * (WORLD_W - VP_W)
  const charWX = vx + CHAR_SX
  const year = Math.round(1990 + progress * 36)

  const birthY = stage === 'baby' ? (1 - clamp(progress / .10, 0, 1)) * -90 : 0

  return (
    <section id="journey" ref={ref} style={{ position: 'relative', height: '700vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
        <svg width="100%" height="100%" viewBox={`${vx} 0 ${VP_W} ${VP_H}`}
          preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#060610" /><stop offset="100%" stopColor="#0F1729" />
            </linearGradient>
          </defs>
          <Sky vx={vx} /><Ground vx={vx} gy={GY} />
          <DevText vx={vx} gy={GY} sm={sm} />
          <BirthO p={progress} vx={vx} gy={GY} sm={sm} />
          <Kinder wx={LM.kinder} gy={GY} sm={sm} label={t('journey_kinder')} />
          <School wx={LM.school} gy={GY} sm={sm} label={t('journey_school')} />
          <Uni wx={LM.uni} gy={GY} progress={progress} sm={sm} label={t('journey_uni')} labelSub={t('journey_uni_sub')} />
          <Metro wx={LM.metro} gy={GY} sm={sm} label={t('journey_metro')} />
          <Constr wx={LM.constr} gy={GY} />
          <LoopMe wx={LM.loopme} gy={GY} />
          <Next />
          <YearTag wx={charWX + 9} gy={GY} year={year} />
          <Character stage={stage} walkPhase={walkPhase} wx={charWX} gy={GY} yOffset={birthY} progress={progress} />
        </svg>
        {progress < 0.02 && (
          <div style={{ position: 'absolute', bottom: sm ? 20 : 36, left: '50%', transform: 'translateX(-50%)', fontFamily: "'Inter',sans-serif", fontSize: sm ? 9 : 10, letterSpacing: '0.14em', color: 'var(--text-muted)', opacity: Math.max(0, 1 - progress * 50), pointerEvents: 'none' }}>scroll</div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 1, width: `${progress * 100}%`, background: 'var(--border)' }} />
      </div>
    </section>
  )
}
