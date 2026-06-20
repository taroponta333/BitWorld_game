import subprocess
import sys
import os

def convert_mp4_to_amv(input_path, output_path):
    """
    MP4動画を古いメディアプレイヤー向けのAMV形式に変換します。
    """
    if not os.path.exists(input_path):
        print(f"エラー: 入力ファイルが見つかりません: {input_path}")
        return False

    # AMVフォーマットの厳格なハードウェア標準仕様に合わせたパラメータ設定
    # -s: 解像度 (160x120 が最も一般的)
    # -r: フレームレート (ハードウェア依存。通常は12、15、16fpsのいずれか)
    # -ac: 音声チャンネル (必ず 1 = モノラル)
    # -ar: 音声サンプリングレート (必ず 22050Hz)
    # -vstrict -1: 一部のエンコーダ制限を回避
    command = [
        'ffmpeg',
        '-i', input_path,
        '-f', 'amv',
        '-s', '160x120',
        '-r', '16',
        '-ac', '1',
        '-ar', '22050',
        '-qmin', '3',
        '-qmax', '3',
        '-vstrict', '-1',
        '-y',  # 上書き強制
        output_path
    ]

    try:
        print(f"変換を開始します: {input_path} -> {output_path}")
        # コマンドの実行
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        print("変換が正常に完了しました！")
        return True
    except subprocess.CalledProcessError as e:
        print("エラー: 変換中に問題が発生しました。")
        print(e.stderr)
        return False
    except FileNotFoundError:
        print("エラー: 'ffmpeg' コマンドが見つかりません。FFmpegがインストールされ、環境変数(Path)が通っているか確認してください。")
        return False

if __name__ == '__main__':
    # 引数チェック (簡易的なCLIインターフェース)
    if len(sys.argv) < 2:
        print("使用方法: python convert.py <入力ファイル.mp4> [<出力ファイル.amv>]")
        sys.exit(1)

    in_file = sys.argv[1]
    
    # 出力ファイル名が指定されていない場合は、拡張子を.amvに変えて自動生成
    if len(sys.argv) >= 3:
        out_file = sys.argv[2]
    else:
        out_file = os.path.splitext(in_file)[0] + '.amv'

    convert_mp4_to_amv(in_file, out_file)
