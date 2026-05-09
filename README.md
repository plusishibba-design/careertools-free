# Image Tools

ブラウザ内完結型の無料画像編集ツール。React 19 + Vite 7。

## ツール一覧（10個）

圧縮 / リサイズ / 変換(7形式) / クロップ / 回転・反転 / ウォーターマーク(単一・バッチ) / フィルター / 背景削除(AI) / メタデータ読み取り / AI高解像度化(2x・4x)

## セットアップ

```bash
npm install
npm run dev      # 開発サーバー (http://localhost:5173)
npm run build    # プロダクションビルド
npm run preview  # ビルド結果プレビュー
```

## 技術

- 画像処理: Canvas API / CSS Filters
- 背景削除: @imgly/background-removal (ONNX, ブラウザ内AI)
- AI高解像度化: UpscalerJS + TensorFlow.js (ESRGAN-medium)
- メタデータ: exifr + カスタムPNGチャンクパーサー
- バンドル: bg-removal / exifr / tfjs / upscaler は manualChunks で分離
