---
title: 'Galerkin：把无限维压成有限维'
description: 'ROUTE-02：局部解路线，从弱形式、特征函数和截断权函数开始。'
pubDate: '2026-05-12'
---

这条档案解决局部解的证明路线：先把无限维 PDE 投影到有限维空间，再靠一致估计和极限过程把信号还原。

## 弱形式

\[
\left(|x|^{-s_1}u_t,\eta\right)
+(\nabla u_t,\nabla\eta)
+(\nabla u,\nabla\eta)
=
\left(|x|^{-s_2}|u|^{p-2}u,\eta\right).
\]

这里 \(\eta\) 是测试函数。左边是演化、阻尼和扩散，右边是带奇异权的非线性源项。

## Galerkin 近似

选择 Dirichlet 特征函数 \(\{w_j\}\)：

\[
-\Delta w_j=\lambda_jw_j,\qquad
w_j|_{\partial\Omega}=0,\qquad
(w_j,w_k)=\delta_{jk}.
\]

有限维近似解写成：

\[
u_m(x,t)=\sum_{j=1}^m g_{jm}(t)w_j(x).
\]

这一步的作用很直接：把 PDE 变成关于系数 \(g_{jm}(t)\) 的常微分方程组。无限维的迷雾暂时被压缩成有限维终端窗口。

## 截断与能量估计

奇异权在原点附近太尖，通常先引入截断权函数，例如：

\[
\rho_{s,n}(x)=\min\{|x|^{-s},n\}.
\]

在截断问题上建立局部解，再证明关键估计不依赖于近似维数 \(m\)。典型目标是控制 \(\|\nabla u_m(t)\|_2\) 与相关带权积分，避免近似序列在极限前就失控。

## 爆破判据

局部解不是说永远存在，而是说在某个时间窗口内可控。若最大存在时间有限，通常会出现能量或梯度范数无法继续延拓的信号：

\[
\limsup_{t\to T_{\max}}\|\nabla u(t)\|_2=+\infty.
\]

这句话的意思是：如果解走到边界，问题不是时间表坏了，而是控制量已经冲出可估计区域。

继续阅读：  
[双奇异权方程：研究对象](/blog/double-singular-pseudo-parabolic/)  
[奇异权：原点附近的异常信号](/blog/singular-weights-physical-picture/)
