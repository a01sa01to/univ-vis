export default `<pre class=shiki style=background-color:#fff;color:#0e1116><div class=lineNumbersRows><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><code><span class=line><span style=color:#a0111f>import</span><span style=color:#0e1116> numpy </span><span style=color:#a0111f>as</span><span style=color:#0e1116> np</span></span>
<span class=line><span style=color:#a0111f>import</span><span style=color:#0e1116> random</span></span>
<span class=line></span>
<span class=line></span>
<span class=line><span style=color:#0e1116>N </span><span style=color:#a0111f>=</span><span style=color:#023b95> 1_000_000</span><span style=color:#66707b>  # 試行回数</span></span>
<span class=line><span style=color:#0e1116>H </span><span style=color:#a0111f>=</span><span style=color:#023b95> 5</span><span style=color:#66707b>  # マスの縦サイズ</span></span>
<span class=line><span style=color:#0e1116>W </span><span style=color:#a0111f>=</span><span style=color:#023b95> 5</span><span style=color:#66707b>  # マスの横サイズ</span></span>
<span class=line><span style=color:#023b95>ACTIONS</span><span style=color:#a0111f> =</span><span style=color:#023b95> 4</span><span style=color:#66707b>  # 上下左右の行動数</span></span>
<span class=line></span>
<span class=line></span>
<span class=line><span style=color:#a0111f>def</span><span style=color:#622cbc> main</span><span style=color:#0349b4>(</span><span style=color:#0349b4>)</span><span style=color:#0e1116>:</span></span>
<span class=line><span style=color:#66707b>  # Q 値を初期化</span></span>
<span class=line><span style=color:#0e1116>  q </span><span style=color:#a0111f>=</span><span style=color:#0e1116> np.zeros</span><span style=color:#0349b4>(</span><span style=color:#055d20>(</span><span style=color:#0e1116>H, W, </span><span style=color:#023b95>ACTIONS</span><span style=color:#055d20>)</span><span style=color:#0349b4>)</span></span>
<span class=line></span>
<span class=line><span style=color:#66707b>  # 繰り返し (1 から N まで)</span></span>
<span class=line><span style=color:#a0111f>  for</span><span style=color:#023b95> round</span><span style=color:#a0111f> in</span><span style=color:#023b95> range</span><span style=color:#0349b4>(</span><span style=color:#023b95>1</span><span style=color:#0e1116>, N </span><span style=color:#a0111f>+</span><span style=color:#023b95> 1</span><span style=color:#0349b4>)</span><span style=color:#0e1116>:</span></span>
<span class=line><span style=color:#66707b>      # Q 値を更新する (省略)</span></span>
<span class=line><span style=color:#66707b>      # ...</span></span>
<span class=line></span>
<span class=line><span style=color:#66707b>      # 1000 回に 1 回出力</span></span>
<span class=line><span style=color:#66707b>      # 小数点以下 3 桁まで表示</span></span>
<span class=line><span style=color:#a0111f>      if</span><span style=color:#023b95> round</span><span style=color:#a0111f> %</span><span style=color:#023b95> 1000</span><span style=color:#a0111f> ==</span><span style=color:#023b95> 0</span><span style=color:#0e1116>:</span></span>
<span class=line><span style=color:#a0111f>          for</span><span style=color:#0e1116> i </span><span style=color:#a0111f>in</span><span style=color:#023b95> range</span><span style=color:#0349b4>(</span><span style=color:#0e1116>H</span><span style=color:#0349b4>)</span><span style=color:#0e1116>:</span></span>
<span class=line><span style=color:#a0111f>              for</span><span style=color:#0e1116> j </span><span style=color:#a0111f>in</span><span style=color:#023b95> range</span><span style=color:#0349b4>(</span><span style=color:#0e1116>W</span><span style=color:#0349b4>)</span><span style=color:#0e1116>:</span></span>
<span class=line><span style=color:#a0111f>                  for</span><span style=color:#0e1116> k </span><span style=color:#a0111f>in</span><span style=color:#023b95> range</span><span style=color:#0349b4>(</span><span style=color:#023b95>ACTIONS</span><span style=color:#0349b4>)</span><span style=color:#0e1116>:</span></span>
<span class=line><span style=color:#023b95>                      print</span><span style=color:#0349b4>(</span><span style=color:#a0111f>f</span><span style=color:#032563>"</span><span style=color:#055d20>{</span><span style=color:#0e1116>q</span><span style=color:#744500>[</span><span style=color:#0e1116>i</span><span style=color:#744500>]</span><span style=color:#744500>[</span><span style=color:#0e1116>j</span><span style=color:#744500>]</span><span style=color:#744500>[</span><span style=color:#0e1116>k</span><span style=color:#744500>]</span><span style=color:#a0111f>:.3f</span><span style=color:#055d20>}</span><span style=color:#032563>"</span><span style=color:#0e1116>, </span><span style=color:#702c00>end</span><span style=color:#a0111f>=</span><span style=color:#032563>' '</span><span style=color:#0349b4>)</span></span>
<span class=line><span style=color:#023b95>          print</span><span style=color:#0349b4>(</span><span style=color:#0349b4>)</span></span>
<span class=line></span>
<span class=line></span>
<span class=line><span style=color:#a0111f>if</span><span style=color:#023b95> __name__</span><span style=color:#a0111f> ==</span><span style=color:#032563> "__main__"</span><span style=color:#0e1116>:</span></span>
<span class=line><span style=color:#0e1116>    main</span><span style=color:#0349b4>(</span><span style=color:#0349b4>)</span></span>
<span class=line></span></code></pre>`