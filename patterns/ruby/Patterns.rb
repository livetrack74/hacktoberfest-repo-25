def pyramid(n)
  (1..n).each do |i|
    puts ' ' * (n - i) + '*' * (2 * i - 1)
  end
end

def inverted(n)
  n.downto(1) do |i|
    puts ' ' * (n - i) + '*' * (2 * i - 1)
  end
end

def diamond(n)
  pyramid(n)
  (n - 1).downto(1) do |i|
    puts ' ' * (n - i) + '*' * (2 * i - 1)
  end
end

def hollow_pyramid(n)
  (1..n).each do |i|
    if i == 1
      puts ' ' * (n - 1) + '*'
    elsif i == n
      puts '*' * (2 * n - 1)
    else
      puts ' ' * (n - i) + '*' + ' ' * (2 * i - 3) + '*'
    end
  end
end

def pascals(n)
  row = [1]
  n.times do
    row_str = row.join(' ')
    puts row_str.center(2 * n)
    next_row = [1]
    (row.length - 1).times do |i|
      next_row.push(row[i] + row[i + 1])
    end
    next_row.push(1)
    row = next_row
  end
end

def hourglass(n)
  inverted(n)
  (2..n).each do |i|
    puts ' ' * (n - i) + '*' * (2 * i - 1)
  end
end

def zigzag(n)
    height = 4
    n.times do |i|
        height.times do |j|
            if j == 0 || j == height - 1
                puts '*' * n
            else
                puts ' ' * (n - i - 1) + '*'
            end
        end
    end
end

def main
  pattern = ARGV[0] || 'pyramid'
  n = ARGV[1]&.to_i || 5

  funcs = {
    'pyramid' => method(:pyramid),
    'inverted' => method(:inverted),
    'diamond' => method(:diamond),
    'hollow_pyramid' => method(:hollow_pyramid),
    'pascals' => method(:pascals),
    'hourglass' => method(:hourglass),
    'zigzag' => method(:zigzag)
  }

  if funcs.key?(pattern)
    funcs[pattern].call(n)
  else
    puts "Unknown pattern. Choose from: #{funcs.keys.join(', ')}"
  end
end

main