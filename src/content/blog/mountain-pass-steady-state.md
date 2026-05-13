---
title: '稳态解变分方法：从能量泛函到 Mountain Pass'
description: '山路定理如何证明椭圆方程存在非平凡解：能量泛函构造、PS 条件验证与 Nehari 替代路线。'
pubDate: '2026-05-11'
---

这篇笔记整理稳态解的存在性证明——论文第四章的核心内容。问题从发展方程去掉时间导数后变成椭圆方程，而证明非平凡解的存在性依赖变分法中的山路定理。

## 稳态问题是什么

去掉时间导数后，双奇异权拟抛物方程的稳态对应问题是：

\[
\begin{cases}
-\Delta u = |x|^{-s_2}|u|^{p-2}u, & x\in\Omega,\\
u=0, & x\in\partial\Omega.
\end{cases}
\]

注意：稳态问题中演化项的奇异权 \( |x|^{-s_1} \) 随 \( u_t = 0 \) 自然消失，只有源项奇异权 \( |x|^{-s_2} \) 保留。参数条件为：

\[
2 \lt p \le \frac{2N}{N-1}, \qquad 0 \le s_2 \lt N - \frac{p(N-2)}{2}
\]

第二个不等式等价于 \( p \lt p^*(s_2) := \frac{2(N-s_2)}{N-2} \)，即非线性指数严格小于加权 Sobolev 临界指数——这保证了次临界紧性。

## 能量泛函

将稳态方程的解重新表述为能量泛函的临界点。定义 \( J: H_0^1(\Omega) \to \mathbb{R} \)：

\[
J(u)=\frac12\|\nabla u\|_2^2 - \frac1p\int_\Omega |x|^{-s_2}|u|^p\,dx
\]

第一项是 Dirichlet 能量（对应扩散项 \( -\Delta u \)），第二项是带权非线性势能（对应源项 \( |u|^{p-2}u/|x|^{s_2} \)）。

对任意 \( \eta \in H_0^1(\Omega) \) 计算方向导数：

\[
\langle J'(u),\eta\rangle = \int_\Omega \nabla u\cdot\nabla\eta\,dx - \int_\Omega |x|^{-s_2}|u|^{p-2}u\,\eta\,dx
\]

如果 \( u \) 满足 \( J'(u) = 0 \)，则由变分法基本引理，\( u \) 是稳态方程的弱解。因此证明稳态解的存在性等价于证明能量泛函 \( J \) 存在非零临界点。

## 三条几何性质

泛函 \( J \) 有三条关键的几何性质，它们一起构成了山路定理所需的几何结构。

**性质 1（原点附近为正）：** 存在 \( \rho \gt 0 \) 和 \( \alpha \gt 0 \)，使得当 \( \|u\|_{H_0^1} = \rho \) 时，\( J(u) \ge \alpha \gt 0 \)。

证明思路：由 Hardy–Sobolev 不等式

\[
\int_\Omega \frac{|u|^p}{|x|^{s_2}} \le C \|\nabla u\|_2^p
\]

代入能量泛函：

\[
J(u) \ge \frac12 \|\nabla u\|_2^2 - \frac{C}{p} \|\nabla u\|_2^p
\]

因为 \( p \gt 2 \)，当 \( \|\nabla u\|_2 \) 足够小时，二次项主导，\( J(u) \gt 0 \)。

**性质 2（远处为负）：** 存在 \( e \in H_0^1(\Omega) \) 满足 \( \|e\|_{H_0^1} \gt \rho \)，使得 \( J(e) \lt 0 \)。

证明思路：取固定的非零函数 \( \varphi \in H_0^1(\Omega) \)，考虑伸缩 \( t\varphi \)（\( t \gt 0 \) 大）。沿这条射线的能量：

\[
J(t\varphi)=\frac{A}{2}t^2-\frac{B}{p}t^p
\]

其中 \( A = \|\nabla\varphi\|_2^2 \)，\( B = \int_\Omega |x|^{-s_2}|\varphi|^p\,dx \)。因为 \( p \gt 2 \)，当 \( t \to \infty \) 时 \( t^p \) 主导 \( t^2 \)，\( J(t\varphi) \to -\infty \)。取足够大的 \( t \) 即得 \( J(e) \lt 0 \)。

**性质 3（PS 条件）：** 任何满足 \( J(u_n) \to c \) 且 \( J'(u_n) \to 0 \) 的序列 \( \{u_n\} \subset H_0^1(\Omega) \) 都有强收敛子列。

这是三条中最需要技术验证的一条。核心工具是次临界 Hardy–Sobolev 紧嵌入：由于 \( p \lt p^*(s_2) \)，加权嵌入

\[
H_0^1(\Omega) \hookrightarrow L^p(\Omega; |x|^{-s_2})
\]

是紧的。利用这个紧性和 \( J'(u_n) \to 0 \) 的条件，可以从有界序列中提取强收敛子列。

具体步骤：先由 PS 序列的有界性（利用 \( p \gt 2 \) 和几何结构推出），再由自反性得到弱收敛子列 \( u_n \rightharpoonup u \)；用 \( J'(u_n) \to 0 \) 取极限得 \( J'(u) = 0 \)；最后通过紧嵌入和 \( J'(u_n)(u_n-u) \) 的分析得到 \( \|\nabla(u_n-u)\|_2 \to 0 \)，即强收敛。

## 山路定理

有了三条性质，直接应用 Ambrosetti–Rabinowitz 山路定理。定义路径类

\[
\Gamma=\{\gamma\in C([0,1],H_0^1(\Omega)):\gamma(0)=0,\ \gamma(1)=e\}
\]

和山路水平

\[
c=\inf_{\gamma\in\Gamma}\max_{t\in[0,1]} J(\gamma(t))
\]

山路定理断言：\( c \) 是 \( J \) 的一个临界值，即存在 \( u \in H_0^1(\Omega) \) 满足 \( J(u) = c \) 且 \( J'(u) = 0 \)。

这里的几何图像是：原点附近能量是正的（性质 1），远处是负的（性质 2）。从 0 走到 e，任何一条路径都必须翻过一个能量"山口"。PS 条件保证这个山口的最高点可以被取到——那就是临界点。

因为 \( J(u) = c \ge \alpha \gt 0 = J(0) \)，所以 \( u \neq 0 \)——它是非平凡解。

## 第二条证明路线：Nehari 最小化

论文还给出了基于 Nehari 流形的第二条证明。定义 Nehari 泛函

\[
I(u)=\|\nabla u\|_2^2 - \int_\Omega |x|^{-s_2}|u|^p\,dx
\]

和 Nehari 流形

\[
\mathcal{N} = \{ u\in H_0^1(\Omega)\setminus\{0\}: \langle J'(u),u\rangle =0 \}
\]

即所有满足 \( \|\nabla u\|_2^2 = \int_\Omega |x|^{-s_2}|u|^p\,dx \) 的非零函数。在这个流形上考虑极小化问题：

\[
m = \inf_{u \in \mathcal{N}} J(u)
\]

可以证明 \( m \) 可以被取到，且极小化子正是方程的非平凡弱解。两条证明路线——Mountain Pass 和 Nehari 极小化——给出同一个稳态问题，但提供了互补的视角：Mountain Pass 从路径和几何出发，Nehari 从缩放和约束优化出发。

## 补充：Pohozaev 非存在性

作为对研究范围的交代，论文也讨论了 Pohozaev 型非存在性结果。当区域为星形、非线性指数 \( p \) 达到或超过某个临界值时，稳态问题可能完全没有非平凡解——无论用什么方法。这解释了为什么次临界条件 \( p \lt p^*(s_2) \) 不仅是证明的需要，也是存在性的真实边界。

## 继续阅读

- [拟抛物方程研究框架：从模型到两条证明主线](/blog/double-singular-pseudo-parabolic/) — 全局结构地图
- [局部解证明地图：从无权模型到双奇异权](/blog/local-solution-proof/) — Galerkin 方法的完整展开
- [我的硕士论文研究了什么](/blog/my-thesis-research/) — 论文总览
