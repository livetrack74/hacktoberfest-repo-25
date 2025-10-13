def pyramid(n=5)
  (1..n).each do |i|
    puts " " * (n - i) + "*" * (2*i - 1)
  end
end

pyramid(5)
