def largestRectangleArea( heights):
        stack = []
        max_area = 0
        n = len(heights)

        for i in range(n + 1):
            while stack and (i == n or heights[stack[-1]] >= heights[i]):
                height = heights[stack.pop()]
                if not stack:
                    width = i
                else:
                    width = i - stack[-1] - 1
                max_area = max(max_area, width * height)
            stack.append(i)

        return max_area
largestRectangleArea([2,1,5,6,2,3])