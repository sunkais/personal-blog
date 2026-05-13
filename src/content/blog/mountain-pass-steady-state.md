---
title: 'Mountain Pass：能量地形里的山口'
description: 'CORE-03：稳态方程、能量泛函、Nehari 流形与 Mountain Pass 路径。'
pubDate: '2026-05-11'
---

这条档案处理稳态解：时间导数关闭以后，方程变成一个变分问题，解对应能量地形中的临界点。

## 稳态方程

\[
\begin{cases}
-\Delta u=|x|^{-s_2}|u|^{p-2}u,
& x\in\Omega,\\
u=0,
& x\in\partial\Omega.
\end{cases}
\]

它看起来比演化方程短很多，但难点没有消失，只是转移到了能量泛函的几何和紧性上。

## 能量泛函

\[
J(u)=\frac12\|\nabla u\|_2^2
-\frac1p\int_\Omega |x|^{-s_2}|u|^p\,dx.
\]

对应的 Nehari 泛函是：

\[
I(u)=\|\nabla u\|_2^2
-\int_\Omega |x|^{-s_2}|u|^p\,dx.
\]

当 \(I(u)=0\) 时，梯度能量和源项能量达到一种平衡。这个平衡面就是后面寻找非平凡解的重要约束。

## 山路直觉

取一个非零方向 \(\varphi\)，沿着 \(t\varphi\) 看能量：

\[
J(t\varphi)=\frac A2t^2-\frac Bp t^p.
\]

当 \(t\) 很小时，二次项占主导，能量向上；当 \(t\) 足够大时，非线性项占主导，能量向下。于是能量地形出现“先上坡、再下坡”的山口结构。

## 路径类与山口水平

\[
\Gamma=\{\gamma\in C([0,1],H_0^1(\Omega)):\gamma(0)=0,\ \gamma(1)=e\}.
\]

\[
c=\inf_{\gamma\in\Gamma}\max_{t\in[0,1]}J(\gamma(t)).
\]

这表示所有从零点出发、走到低能量区域的路径里，选择最高点尽量低的那一条。那个不可避免的最高点，就是山口水平。

## Nehari 流形

\[
\mathcal N
=
\left\{
u\in H_0^1(\Omega)\setminus\{0\}:
\langle J'(u),u\rangle=0
\right\}.
\]

Nehari 流形提供另一种看法：不在整个空间里乱找，而是在自然约束上寻找能量极小点。它和 Mountain Pass 的山路图像相互对应。

继续阅读：  
[Galerkin：把无限维压成有限维](/blog/local-solution-proof/)  
[数值实验：证明之外的直观](/blog/numerical-glimpse/)
