def solve():
    import sys
    input = sys.stdin.read
    data = input().split()
    
    t = int(data[0])
    index = 1
    results = []
    
    for _ in range(t):
        n = int(data[index])
        k = int(data[index + 1])
        a = list(map(int, data[index + 2: index + 2 + n]))
        index += 2 + n
        
        a.sort()  # Sort in ascending order
        
        cnt = 1
        ans = 1
        
        for i in range(1, n):
            if a[i] - a[i - 1] > k:
                cnt = 1
            else:
                cnt += 1
            ans = max(ans, cnt)
        
        results.append(ans)
    
    print('\n'.join(map(str, results)))

# If running this as a script, make sure to call solve()
if __name__ == "__main__":
    solve()
