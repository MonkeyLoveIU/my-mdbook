你写的这个 `CustomKNN` 类结构清晰，但核心问题是：

> `KNeighborsClassifier(metric=...)` 中的 `metric` **不支持你那种带“权重”返回值的写法**。

---

## ❌ 为什么会出错

```python
metric=self.custom_metric
```

这个 `metric` 函数的目的是计算「两个样本之间的距离」，它应返回一个 **标量值（float）**，而不是一个距离数组或权重数组。你在 `custom_metric` 中返回了一个数组：

```python
weights = np.where(distances <= 3, distances, np.exp(distances - 3))
return weights  # ❌ 不应该是数组
```

这会导致 `KNeighborsClassifier` 出错或行为异常。
  
---

## ✅ 正确方式：使用 `weights=` 自定义权重函数

你应使用 `weights=自定义函数` 的方式来控制样本距离与权重的关系，而不是尝试改写 `metric`。下面是你代码的正确写法：

---

## ✅ 修正后的代码（按你设定：3以内为线性，3以外为指数）

```python
import numpy as np
from sklearn.neighbors import KNeighborsClassifier

# 自定义权重函数
def custom_weights(distances):
    # 3以内线性（使用1 / d模拟线性衰减），否则指数衰减
    weights = np.where(distances <= 3, 1 / (distances + 1e-5), np.exp(-distances))
    return weights

# 创建模型，使用自定义权重函数
knn = KNeighborsClassifier(n_neighbors=3, weights=custom_weights)

# 示例训练数据
X_train = np.array([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]])
y_train = np.array([0, 0, 1, 1, 1])

# 拟合模型
knn.fit(X_train, y_train)

# 测试点
X_test = np.array([[1.5, 2.5]])

# 预测
predictions = knn.predict(X_test)
print("预测结果：", predictions)
```

---

## 🔍 输出说明

* 自定义的 `weights` 函数只影响 KNN 投票时不同邻居的“权重”。
* 距离越近，线性（反比）方式赋予更高权重；距离远，使用 `exp(-d)` 权重很快趋近于0。
* 你无需写类去封装，除非你想做更多高级扩展。

---

