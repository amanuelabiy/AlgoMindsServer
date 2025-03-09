import prismaClient from "../src/config/prismaClient";
import { ProblemDifficulty, Status } from "@prisma/client";

const problems = [
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    content:
      "Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_. You may assume that each input would have **_exactly_ one solution**, and you may not use the _same_ element twice. You can return the answer in any order.\n\n**Example 1:**\n**Input:** nums = [2,7,11,15], target = 9\n**Output:** [0,1]\n**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].\n\n**Example 2:**\n**Input:** nums = [3,2,4], target = 6\n**Output:** [1,2]\n\n**Example 3:**\n**Input:** nums = [3,3], target = 6\n**Output:** [0,1]\n\n**Constraints:**\n*   2 <= nums.length <= 10^4\n*   -10^9 <= nums[i] <= 10^9\n*   -10^9 <= target <= 10^9\n*   **Only one valid answer exists.**\n\n**Follow-up:** Can you come up with an algorithm that is less than O(n^2) time complexity?",
    solutions: {
      "C++":
        "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> m;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (m.find(complement) != m.end()) {\n                return {m[complement], i};\n            }\n            m[nums[i]] = i;\n        }\n        return {};\n    }\n};",
      Python:
        "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        hashmap = {}\n        for i, num in enumerate(nums):\n            if target - num in hashmap:\n                return [hashmap[target - num], i]\n            hashmap[num] = i\n        return []",
      Java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        throw new IllegalArgumentException("No two sum solution");\n    }\n}',
      "C#": 'public class Solution {\n    public int[] TwoSum(int[] nums, int target) {\n        var dict = new Dictionary<int, int>();\n        for (int i = 0; i < nums.Length; i++) {\n            int complement = target - nums[i];\n            if (dict.ContainsKey(complement)) {\n                return new int[] { dict[complement], i };\n            }\n            dict[nums[i]] = i;\n        }\n        throw new Exception("No two sum solution");\n    }\n}',
      JavaScript:
        "var twoSum = function(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        let complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n};",
      TypeScript:
        "function twoSum(nums: number[], target: number): number[] {\n    const map: Map<number, number> = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement)!, i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}\nexport { twoSum };",
    },
    tags: ["Array", "Hash Table"],
    status: "Not Attempted",
    testCases: [
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        output: [0, 1],
        description:
          "Basic test case where the first and second elements add up to the target.",
      },
      {
        input: { nums: [3, 2, 4], target: 6 },
        output: [1, 2],
        description: "Test case with valid pair in the middle of the array.",
      },
      {
        input: { nums: [3, 3], target: 6 },
        output: [0, 1],
        description: "Test case with duplicate numbers forming the valid pair.",
      },
      {
        input: { nums: [0, 4, 3, 0], target: 0 },
        output: [0, 3],
        description: "Test case involving zero values.",
      },
      {
        input: { nums: [-3, 4, 3, 90], target: 0 },
        output: [0, 2],
        description: "Test case including negative numbers.",
      },
    ],
  },
  {
    slug: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    content:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\n**Example:**\nInput: (2 -> 4 -> 3) + (5 -> 6 -> 4)\nOutput: 7 -> 0 -> 8\nExplanation: 342 + 465 = 807.",
    solutions: {
      "C++":
        "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        ListNode dummy(0);\n        ListNode* curr = &dummy;\n        int carry = 0;\n        while(l1 || l2 || carry) {\n            int sum = carry;\n            if(l1) { sum += l1->val; l1 = l1->next; }\n            if(l2) { sum += l2->val; l2 = l2->next; }\n            carry = sum / 10;\n            curr->next = new ListNode(sum % 10);\n            curr = curr->next;\n        }\n        return dummy.next;\n    }\n};",
      Python:
        "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:\n        dummy = ListNode(0)\n        curr = dummy\n        carry = 0\n        while l1 or l2 or carry:\n            s = carry\n            if l1:\n                s += l1.val\n                l1 = l1.next\n            if l2:\n                s += l2.val\n                l2 = l2.next\n            carry = s // 10\n            curr.next = ListNode(s % 10)\n            curr = curr.next\n        return dummy.next",
      Java: "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode(int x) { val = x; }\n * }\n */\nclass Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        int carry = 0;\n        while(l1 != null || l2 != null || carry != 0) {\n            int sum = carry;\n            if(l1 != null) { sum += l1.val; l1 = l1.next; }\n            if(l2 != null) { sum += l2.val; l2 = l2.next; }\n            carry = sum / 10;\n            curr.next = new ListNode(sum % 10);\n            curr = curr.next;\n        }\n        return dummy.next;\n    }\n}",
      "C#": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     public int val;\n *     public ListNode next;\n *     public ListNode(int x) { val = x; }\n * }\n */\npublic class Solution {\n    public ListNode AddTwoNumbers(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        int carry = 0;\n        while(l1 != null || l2 != null || carry != 0) {\n            int sum = carry;\n            if(l1 != null) { sum += l1.val; l1 = l1.next; }\n            if(l2 != null) { sum += l2.val; l2 = l2.next; }\n            carry = sum / 10;\n            curr.next = new ListNode(sum % 10);\n            curr = curr.next;\n        }\n        return dummy.next;\n    }\n}",
      JavaScript:
        "function addTwoNumbers(l1, l2) {\n    let dummy = { val: 0, next: null };\n    let current = dummy;\n    let carry = 0;\n    while(l1 || l2 || carry) {\n        let sum = carry;\n        if(l1) { sum += l1.val; l1 = l1.next; }\n        if(l2) { sum += l2.val; l2 = l2.next; }\n        carry = Math.floor(sum / 10);\n        current.next = { val: sum % 10, next: null };\n        current = current.next;\n    }\n    return dummy.next;\n}",
      TypeScript:
        "interface ListNode {\n    val: number;\n    next: ListNode | null;\n}\nfunction addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {\n    let dummy: ListNode = { val: 0, next: null };\n    let current = dummy;\n    let carry = 0;\n    while(l1 !== null || l2 !== null || carry !== 0) {\n        let sum = carry;\n        if(l1 !== null) { sum += l1.val; l1 = l1.next; }\n        if(l2 !== null) { sum += l2.val; l2 = l2.next; }\n        carry = Math.floor(sum / 10);\n        current.next = { val: sum % 10, next: null };\n        current = current.next;\n    }\n    return dummy.next;\n}\nexport { addTwoNumbers };",
    },
    tags: ["Linked List", "Math"],
    status: "Not Attempted",
    testCases: [
      {
        input: { l1: [2, 4, 3], l2: [5, 6, 4] },
        output: [7, 0, 8],
        description:
          "Standard test case with equal-length lists and a carry over.",
      },
      {
        input: { l1: [0], l2: [0] },
        output: [0],
        description: "Test case with both lists having a single zero.",
      },
      {
        input: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] },
        output: [8, 9, 9, 9, 0, 0, 0, 1],
        description:
          "Test case with different length lists and multiple carry overs.",
      },
      {
        input: { l1: [1, 8], l2: [0] },
        output: [1, 8],
        description: "Test case where one list is significantly shorter.",
      },
    ],
  },
  {
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    content:
      'Given a string s, find the length of the longest substring without repeating characters.\n\n**Example:**\nInput: s = "abcabcbb"\nOutput: 3\nExplanation: The answer is "abc", with the length of 3.',
    solutions: {
      "C++":
        "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        vector<int> index(128, -1);\n        int maxLen = 0, start = -1;\n        for (int i = 0; i < s.size(); i++) {\n            start = max(start, index[s[i]]);\n            maxLen = max(maxLen, i - start);\n            index[s[i]] = i;\n        }\n        return maxLen;\n    }\n};",
      Python:
        "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        index = {}\n        max_len = 0\n        start = 0\n        for i, char in enumerate(s):\n            if char in index and index[char] >= start:\n                start = index[char] + 1\n            max_len = max(max_len, i - start + 1)\n            index[char] = i\n        return max_len",
      Java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        int[] index = new int[128];\n        Arrays.fill(index, -1);\n        int maxLen = 0, start = -1;\n        for (int i = 0; i < s.length(); i++) {\n            start = Math.max(start, index[s.charAt(i)]);\n            maxLen = Math.max(maxLen, i - start);\n            index[s.charAt(i)] = i;\n        }\n        return maxLen;\n    }\n}",
      "C#": "public class Solution {\n    public int LengthOfLongestSubstring(string s) {\n        int[] index = new int[128];\n        for(int i = 0; i < 128; i++) index[i] = -1;\n        int maxLen = 0, start = -1;\n        for(int i = 0; i < s.Length; i++){\n            start = Math.Max(start, index[s[i]]);\n            maxLen = Math.Max(maxLen, i - start);\n            index[s[i]] = i;\n        }\n        return maxLen;\n    }\n}",
      JavaScript:
        "var lengthOfLongestSubstring = function(s) {\n    let index = new Array(128).fill(-1);\n    let maxLen = 0, start = -1;\n    for(let i = 0; i < s.length; i++){\n        start = Math.max(start, index[s.charCodeAt(i)]);\n        maxLen = Math.max(maxLen, i - start);\n        index[s.charCodeAt(i)] = i;\n    }\n    return maxLen;\n};",
      TypeScript:
        "function lengthOfLongestSubstring(s: string): number {\n    const index: number[] = new Array(128).fill(-1);\n    let maxLen = 0, start = -1;\n    for (let i = 0; i < s.length; i++){\n        start = Math.max(start, index[s.charCodeAt(i)]);\n        maxLen = Math.max(maxLen, i - start);\n        index[s.charCodeAt(i)] = i;\n    }\n    return maxLen;\n}\nexport { lengthOfLongestSubstring };",
    },
    tags: ["Hash Table", "String", "Sliding Window"],
    status: "Not Attempted",
    testCases: [
      {
        input: { s: "abcabcbb" },
        output: 3,
        description:
          "Test with repeated pattern; longest unique substring is 'abc'.",
      },
      {
        input: { s: "bbbbb" },
        output: 1,
        description: "All characters are the same.",
      },
      {
        input: { s: "pwwkew" },
        output: 3,
        description:
          "Substring 'wke' is the longest without repeating characters.",
      },
      {
        input: { s: "" },
        output: 0,
        description: "Empty string should return 0.",
      },
      {
        input: { s: " " },
        output: 1,
        description: "Single space should return 1.",
      },
    ],
  },
  {
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    content:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).\n\n**Example 1:**\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.0\n\n**Example 2:**\nInput: nums1 = [1,2], nums2 = [3,4]\nOutput: 2.5",
    solutions: {
      "C++":
        "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        if(nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);\n        int m = nums1.size(), n = nums2.size();\n        int imin = 0, imax = m, halfLen = (m+n+1) / 2;\n        while(imin <= imax){\n            int i = (imin + imax) / 2;\n            int j = halfLen - i;\n            if(i < m && nums2[j-1] > nums1[i]) {\n                imin = i + 1;\n            } else if(i > 0 && nums1[i-1] > nums2[j]) {\n                imax = i - 1;\n            } else {\n                int maxLeft = 0;\n                if(i == 0) { maxLeft = nums2[j-1]; }\n                else if(j == 0) { maxLeft = nums1[i-1]; }\n                else { maxLeft = max(nums1[i-1], nums2[j-1]); }\n                if((m+n) % 2 == 1) return maxLeft;\n                int minRight = 0;\n                if(i == m) { minRight = nums2[j]; }\n                else if(j == n) { minRight = nums1[i]; }\n                else { minRight = min(nums1[i], nums2[j]); }\n                return (maxLeft + minRight) / 2.0;\n            }\n        }\n        return 0.0;\n    }\n};",
      Python:
        "class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        A, B = nums1, nums2\n        m, n = len(A), len(B)\n        if m > n:\n            A, B, m, n = B, A, n, m\n        imin, imax, half_len = 0, m, (m + n + 1) // 2\n        while imin <= imax:\n            i = (imin + imax) // 2\n            j = half_len - i\n            if i < m and B[j-1] > A[i]:\n                imin = i + 1\n            elif i > 0 and A[i-1] > B[j]:\n                imax = i - 1\n            else:\n                if i == 0:\n                    max_of_left = B[j-1]\n                elif j == 0:\n                    max_of_left = A[i-1]\n                else:\n                    max_of_left = max(A[i-1], B[j-1])\n                if (m + n) % 2 == 1:\n                    return max_of_left\n                if i == m:\n                    min_of_right = B[j]\n                elif j == n:\n                    min_of_right = A[i]\n                else:\n                    min_of_right = min(A[i], B[j])\n                return (max_of_left + min_of_right) / 2.0\n",
      Java: "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        if(nums1.length > nums2.length)\n            return findMedianSortedArrays(nums2, nums1);\n        int m = nums1.length, n = nums2.length;\n        int imin = 0, imax = m, halfLen = (m + n + 1) / 2;\n        while(imin <= imax) {\n            int i = (imin + imax) / 2;\n            int j = halfLen - i;\n            if(i < m && nums2[j-1] > nums1[i])\n                imin = i + 1;\n            else if(i > 0 && nums1[i-1] > nums2[j])\n                imax = i - 1;\n            else {\n                int maxLeft;\n                if(i == 0) { maxLeft = nums2[j-1]; }\n                else if(j == 0) { maxLeft = nums1[i-1]; }\n                else { maxLeft = Math.max(nums1[i-1], nums2[j-1]); }\n                if((m + n) % 2 == 1) return maxLeft;\n                int minRight;\n                if(i == m) { minRight = nums2[j]; }\n                else if(j == n) { minRight = nums1[i]; }\n                else { minRight = Math.min(nums1[i], nums2[j]); }\n                return (maxLeft + minRight) / 2.0;\n            }\n        }\n        return 0.0;\n    }\n}",
      "C#": "public class Solution {\n    public double FindMedianSortedArrays(int[] nums1, int[] nums2) {\n        if(nums1.Length > nums2.Length)\n            return FindMedianSortedArrays(nums2, nums1);\n        int m = nums1.Length, n = nums2.Length;\n        int imin = 0, imax = m, halfLen = (m + n + 1) / 2;\n        while(imin <= imax) {\n            int i = (imin + imax) / 2;\n            int j = halfLen - i;\n            if(i < m && nums2[j-1] > nums1[i])\n                imin = i + 1;\n            else if(i > 0 && nums1[i-1] > nums2[j])\n                imax = i - 1;\n            else {\n                int maxLeft = 0;\n                if(i == 0) { maxLeft = nums2[j-1]; }\n                else if(j == 0) { maxLeft = nums1[i-1]; }\n                else { maxLeft = Math.Max(nums1[i-1], nums2[j-1]); }\n                if((m + n) % 2 == 1)\n                    return maxLeft;\n                int minRight = 0;\n                if(i == m) { minRight = nums2[j]; }\n                else if(j == n) { minRight = nums1[i]; }\n                else { minRight = Math.Min(nums1[i], nums2[j]); }\n                return (maxLeft + minRight) / 2.0;\n            }\n        }\n        return 0.0;\n    }\n}",
      JavaScript:
        "var findMedianSortedArrays = function(nums1, nums2) {\n    if(nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n    let m = nums1.length, n = nums2.length;\n    let imin = 0, imax = m, halfLen = Math.floor((m+n+1)/2);\n    while(imin <= imax) {\n        let i = Math.floor((imin + imax) / 2);\n        let j = halfLen - i;\n        if(i < m && nums2[j-1] > nums1[i]) {\n            imin = i + 1;\n        } else if(i > 0 && nums1[i-1] > nums2[j]) {\n            imax = i - 1;\n        } else {\n            let maxLeft = 0;\n            if(i === 0) { maxLeft = nums2[j-1]; }\n            else if(j === 0) { maxLeft = nums1[i-1]; }\n            else { maxLeft = Math.max(nums1[i-1], nums2[j-1]); }\n            if((m+n) % 2 === 1) return maxLeft;\n            let minRight = 0;\n            if(i === m) { minRight = nums2[j]; }\n            else if(j === n) { minRight = nums1[i]; }\n            else { minRight = Math.min(nums1[i], nums2[j]); }\n            return (maxLeft + minRight) / 2;\n        }\n    }\n    return 0;\n};",
      TypeScript:
        "function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n    if(nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n    let m = nums1.length, n = nums2.length;\n    let imin = 0, imax = m, halfLen = Math.floor((m+n+1)/2);\n    while(imin <= imax) {\n        let i = Math.floor((imin + imax) / 2);\n        let j = halfLen - i;\n        if(i < m && nums2[j-1] > nums1[i]) {\n            imin = i + 1;\n        } else if(i > 0 && nums1[i-1] > nums2[j]) {\n            imax = i - 1;\n        } else {\n            let maxLeft: number;\n            if(i === 0) { maxLeft = nums2[j-1]; }\n            else if(j === 0) { maxLeft = nums1[i-1]; }\n            else { maxLeft = Math.max(nums1[i-1], nums2[j-1]); }\n            if((m+n) % 2 === 1) return maxLeft;\n            let minRight: number;\n            if(i === m) { minRight = nums2[j]; }\n            else if(j === n) { minRight = nums1[i]; }\n            else { minRight = Math.min(nums1[i], nums2[j]); }\n            return (maxLeft + minRight) / 2;\n        }\n    }\n    return 0;\n}\nexport { findMedianSortedArrays };",
    },
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    status: "Not Attempted",
    testCases: [
      {
        input: { nums1: [1, 3], nums2: [2] },
        output: 2.0,
        description: "Odd total length; median is the middle element.",
      },
      {
        input: { nums1: [1, 2], nums2: [3, 4] },
        output: 2.5,
        description:
          "Even total length; median is the average of the two middle elements.",
      },
      {
        input: { nums1: [], nums2: [1] },
        output: 1.0,
        description: "Edge case with one empty array.",
      },
      {
        input: { nums1: [1, 2], nums2: [1, 2, 3] },
        output: 2.0,
        description: "Arrays with duplicate elements and different sizes.",
      },
    ],
  },
  {
    slug: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    content:
      'Given a string s, return the longest palindromic substring in s.\n\n**Example 1:**\nInput: s = "babad"\nOutput: "bab" or "aba"\n\n**Example 2:**\nInput: s = "cbbd"\nOutput: "bb"',
    solutions: {
      "C++":
        'class Solution {\npublic:\n    string longestPalindrome(string s) {\n        if(s.empty()) return "";\n        int start = 0, maxLen = 1;\n        for (int i = 0; i < s.size(); i++) {\n            int l = i, r = i;\n            while(l >= 0 && r < s.size() && s[l] == s[r]) {\n                if(r - l + 1 > maxLen) {\n                    start = l;\n                    maxLen = r - l + 1;\n                }\n                l--; r++;\n            }\n            l = i; r = i+1;\n            while(l >= 0 && r < s.size() && s[l] == s[r]) {\n                if(r - l + 1 > maxLen) {\n                    start = l;\n                    maxLen = r - l + 1;\n                }\n                l--; r++;\n            }\n        }\n        return s.substr(start, maxLen);\n    }\n};',
      Python:
        'class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        if not s:\n            return ""\n        start, max_len = 0, 1\n        for i in range(len(s)):\n            l, r = i, i\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                if r - l + 1 > max_len:\n                    start, max_len = l, r - l + 1\n                l -= 1\n                r += 1\n            l, r = i, i+1\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                if r - l + 1 > max_len:\n                    start, max_len = l, r - l + 1\n                l -= 1\n                r += 1\n        return s[start:start+max_len]',
      Java: 'class Solution {\n    public String longestPalindrome(String s) {\n        if(s == null || s.length() < 1) return "";\n        int start = 0, end = 0;\n        for (int i = 0; i < s.length(); i++) {\n            int len1 = expandAroundCenter(s, i, i);\n            int len2 = expandAroundCenter(s, i, i+1);\n            int len = Math.max(len1, len2);\n            if(len > end - start) {\n                start = i - (len - 1) / 2;\n                end = i + len / 2;\n            }\n        }\n        return s.substring(start, end+1);\n    }\n    private int expandAroundCenter(String s, int left, int right) {\n        while(left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)){\n            left--;\n            right++;\n        }\n        return right - left - 1;\n    }\n}',
      "C#": 'public class Solution {\n    public string LongestPalindrome(string s) {\n        if(string.IsNullOrEmpty(s)) return "";\n        int start = 0, end = 0;\n        for(int i = 0; i < s.Length; i++){\n            int len1 = ExpandAroundCenter(s, i, i);\n            int len2 = ExpandAroundCenter(s, i, i+1);\n            int len = Math.Max(len1, len2);\n            if(len > end - start){\n                start = i - (len - 1) / 2;\n                end = i + len / 2;\n            }\n        }\n        return s.Substring(start, end - start + 1);\n    }\n    private int ExpandAroundCenter(string s, int left, int right) {\n        while(left >= 0 && right < s.Length && s[left] == s[right]){\n            left--;\n            right++;\n        }\n        return right - left - 1;\n    }\n}',
      JavaScript:
        'var longestPalindrome = function(s) {\n    if(!s || s.length < 1) return "";\n    let start = 0, end = 0;\n    for(let i = 0; i < s.length; i++){\n        let len1 = expandAroundCenter(s, i, i);\n        let len2 = expandAroundCenter(s, i, i+1);\n        let len = Math.max(len1, len2);\n        if(len > end - start){\n            start = i - Math.floor((len - 1) / 2);\n            end = i + Math.floor(len / 2);\n        }\n    }\n    return s.substring(start, end+1);\n};\n\nfunction expandAroundCenter(s, left, right) {\n    while(left >= 0 && right < s.length && s[left] === s[right]){\n        left--;\n        right++;\n    }\n    return right - left - 1;\n}',
      TypeScript:
        'function longestPalindrome(s: string): string {\n    if (!s || s.length < 1) return "";\n    let start = 0, end = 0;\n    for (let i = 0; i < s.length; i++){\n        let len1 = expandAroundCenter(s, i, i);\n        let len2 = expandAroundCenter(s, i, i+1);\n        let len = Math.max(len1, len2);\n        if(len > end - start){\n            start = i - Math.floor((len - 1) / 2);\n            end = i + Math.floor(len / 2);\n        }\n    }\n    return s.substring(start, end+1);\n}\nfunction expandAroundCenter(s: string, left: number, right: number): number {\n    while(left >= 0 && right < s.length && s[left] === s[right]){\n        left--;\n        right++;\n    }\n    return right - left - 1;\n}\nexport { longestPalindrome };',
    },
    tags: ["String", "Dynamic Programming"],
    status: "Not Attempted",
    testCases: [
      {
        input: { s: "babad" },
        output: "bab (or aba)",
        description:
          "The output can be either 'bab' or 'aba' as both are valid palindromic substrings.",
      },
      {
        input: { s: "cbbd" },
        output: "bb",
        description: "Test case with even length palindrome.",
      },
      {
        input: { s: "a" },
        output: "a",
        description: "Single character string.",
      },
      {
        input: { s: "" },
        output: "",
        description: "Empty string should return an empty string.",
      },
      {
        input: { s: "ac" },
        output: "a (or c)",
        description: "No palindrome longer than 1 character.",
      },
    ],
  },
  {
    slug: "reverse-integer",
    title: "Reverse Integer",
    difficulty: "Medium",
    content:
      "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.\n\n**Example 1:**\nInput: x = 123\nOutput: 321\n\n**Example 2:**\nInput: x = -123\nOutput: -321\n\n**Example 3:**\nInput: x = 120\nOutput: 21",
    solutions: {
      "C++":
        "class Solution {\npublic:\n    int reverse(int x) {\n        int rev = 0;\n        while(x != 0) {\n            int pop = x % 10;\n            x /= 10;\n            if(rev > INT_MAX/10 || (rev == INT_MAX / 10 && pop > 7)) return 0;\n            if(rev < INT_MIN/10 || (rev == INT_MIN / 10 && pop < -8)) return 0;\n            rev = rev * 10 + pop;\n        }\n        return rev;\n    }\n};",
      Python:
        "class Solution:\n    def reverse(self, x: int) -> int:\n        sign = -1 if x < 0 else 1\n        x_abs = abs(x)\n        rev = 0\n        while x_abs:\n            rev = rev * 10 + x_abs % 10\n            x_abs //= 10\n        rev *= sign\n        if rev < -2**31 or rev > 2**31 - 1:\n            return 0\n        return rev",
      Java: "class Solution {\n    public int reverse(int x) {\n        int rev = 0;\n        while(x != 0) {\n            int pop = x % 10;\n            x /= 10;\n            if(rev > Integer.MAX_VALUE/10 || (rev == Integer.MAX_VALUE/10 && pop > 7)) return 0;\n            if(rev < Integer.MIN_VALUE/10 || (rev == Integer.MIN_VALUE/10 && pop < -8)) return 0;\n            rev = rev * 10 + pop;\n        }\n        return rev;\n    }\n}",
      "C#": "public class Solution {\n    public int Reverse(int x) {\n        int rev = 0;\n        while(x != 0) {\n            int pop = x % 10;\n            x /= 10;\n            if(rev > int.MaxValue/10 || (rev == int.MaxValue/10 && pop > 7)) return 0;\n            if(rev < int.MinValue/10 || (rev == int.MinValue/10 && pop < -8)) return 0;\n            rev = rev * 10 + pop;\n        }\n        return rev;\n    }\n}",
      JavaScript:
        "var reverse = function(x) {\n    let rev = 0;\n    while(x !== 0) {\n        let pop = x % 10;\n        x = (x / 10) | 0;\n        if(rev > Math.floor((2**31 - 1) / 10) || (rev === Math.floor((2**31 - 1) / 10) && pop > 7)) return 0;\n        if(rev < Math.ceil(-2**31 / 10) || (rev === Math.ceil(-2**31 / 10) && pop < -8)) return 0;\n        rev = rev * 10 + pop;\n    }\n    return rev;\n};",
      TypeScript:
        "function reverse(x: number): number {\n    let rev = 0;\n    while(x !== 0) {\n        let pop = x % 10;\n        x = (x / 10) | 0;\n        if(rev > Math.floor((2**31 - 1) / 10) || (rev === Math.floor((2**31 - 1) / 10) && pop > 7)) return 0;\n        if(rev < Math.ceil(-2**31 / 10) || (rev === Math.ceil(-2**31 / 10) && pop < -8)) return 0;\n        rev = rev * 10 + pop;\n    }\n    return rev;\n}\nexport { reverse };",
    },
    tags: ["Math"],
    status: "Not Attempted",
    testCases: [
      {
        input: { x: 123 },
        output: 321,
        description: "Basic positive integer reversal.",
      },
      {
        input: { x: -123 },
        output: -321,
        description: "Negative integer reversal.",
      },
      {
        input: { x: 120 },
        output: 21,
        description: "Reversal with trailing zero.",
      },
      {
        input: { x: 0 },
        output: 0,
        description: "Zero should return zero.",
      },
      {
        input: { x: 1534236469 },
        output: 0,
        description: "Test case for overflow; should return 0.",
      },
    ],
  },
  {
    slug: "string-to-integer-atoi",
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    content:
      'Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++\'s atoi function).\n\nThe algorithm:\n1. Read in and ignore any leading whitespace.\n2. Check if the next character is \'-\' or \'+\'. Determine the sign.\n3. Read in the next characters until the next non-digit character is encountered.\n4. Convert these digits into an integer.\n5. Clamp the integer if it is out of the 32-bit signed integer range.\n\n**Example 1:**\nInput: s = "42"\nOutput: 42\n\n**Example 2:**\nInput: s = "   -42"\nOutput: -42\n\n**Example 3:**\nInput: s = "4193 with words"\nOutput: 4193',
    solutions: {
      "C++":
        "class Solution {\npublic:\n    int myAtoi(string s) {\n        int i = 0, n = s.size();\n        while(i < n && s[i] == ' ') i++;\n        int sign = 1;\n        if(i < n && (s[i] == '+' || s[i] == '-')) {\n            sign = (s[i] == '-') ? -1 : 1;\n            i++;\n        }\n        long num = 0;\n        while(i < n && isdigit(s[i])) {\n            num = num * 10 + (s[i] - '0');\n            if(num * sign >= INT_MAX) return INT_MAX;\n            if(num * sign <= INT_MIN) return INT_MIN;\n            i++;\n        }\n        return num * sign;\n    }\n};",
      Python:
        "class Solution:\n    def myAtoi(self, s: str) -> int:\n        s = s.lstrip()\n        if not s:\n            return 0\n        sign = 1\n        index = 0\n        if s[0] in ['+', '-']:\n            sign = -1 if s[0] == '-' else 1\n            index += 1\n        num = 0\n        while index < len(s) and s[index].isdigit():\n            num = num * 10 + int(s[index])\n            if sign * num >= 2**31 - 1:\n                return 2**31 - 1\n            if sign * num <= -2**31:\n                return -2**31\n            index += 1\n        return sign * num",
      Java: "class Solution {\n    public int myAtoi(String s) {\n        s = s.trim();\n        if(s.isEmpty()) return 0;\n        int sign = 1, i = 0;\n        if(s.charAt(0) == '+' || s.charAt(0) == '-') {\n            sign = s.charAt(0) == '-' ? -1 : 1;\n            i++;\n        }\n        long num = 0;\n        while(i < s.length() && Character.isDigit(s.charAt(i))) {\n            num = num * 10 + (s.charAt(i) - '0');\n            if(sign * num >= Integer.MAX_VALUE) return Integer.MAX_VALUE;\n            if(sign * num <= Integer.MIN_VALUE) return Integer.MIN_VALUE;\n            i++;\n        }\n        return (int)(sign * num);\n    }\n}",
      "C#": "public class Solution {\n    public int MyAtoi(string s) {\n        s = s.Trim();\n        if(string.IsNullOrEmpty(s)) return 0;\n        int sign = 1, i = 0;\n        if(s[0] == '+' || s[0] == '-') {\n            sign = s[0] == '-' ? -1 : 1;\n            i++;\n        }\n        long num = 0;\n        while(i < s.Length && char.IsDigit(s[i])) {\n            num = num * 10 + (s[i] - '0');\n            if(sign * num >= int.MaxValue) return int.MaxValue;\n            if(sign * num <= int.MinValue) return int.MinValue;\n            i++;\n        }\n        return (int)(sign * num);\n    }\n}",
      JavaScript:
        "var myAtoi = function(s) {\n    s = s.trim();\n    if(s.length === 0) return 0;\n    let sign = 1, i = 0;\n    if(s[0] === '+' || s[0] === '-') {\n        sign = s[0] === '-' ? -1 : 1;\n        i++;\n    }\n    let num = 0;\n    while(i < s.length && s[i] >= '0' && s[i] <= '9'){\n        num = num * 10 + (s[i].charCodeAt(0) - '0'.charCodeAt(0));\n        if(sign * num >= 2**31 - 1) return 2**31 - 1;\n        if(sign * num <= -(2**31)) return -(2**31);\n        i++;\n    }\n    return sign * num;\n};",
      TypeScript:
        "function myAtoi(s: string): number {\n    s = s.trim();\n    if(s.length === 0) return 0;\n    let sign = 1, i = 0;\n    if(s[0] === '+' || s[0] === '-') {\n        sign = s[0] === '-' ? -1 : 1;\n        i++;\n    }\n    let num = 0;\n    while(i < s.length && s[i] >= '0' && s[i] <= '9'){\n        num = num * 10 + (s[i].charCodeAt(0) - '0'.charCodeAt(0));\n        if(sign * num >= 2**31 - 1) return 2**31 - 1;\n        if(sign * num <= -(2**31)) return -(2**31);\n        i++;\n    }\n    return sign * num;\n}\nexport { myAtoi };",
    },
    tags: ["String"],
    status: "Not Attempted",
    testCases: [
      {
        input: { s: "42" },
        output: 42,
        description: "Basic numeric string conversion.",
      },
      {
        input: { s: "   -42" },
        output: -42,
        description: "String with leading whitespace and negative sign.",
      },
      {
        input: { s: "4193 with words" },
        output: 4193,
        description: "Conversion stops at first non-digit character.",
      },
      {
        input: { s: "words and 987" },
        output: 0,
        description: "Non-numeric string should return 0.",
      },
      {
        input: { s: "-91283472332" },
        output: -2147483648,
        description: "Test for underflow; value should be clamped to INT_MIN.",
      },
    ],
  },
  {
    slug: "palindrome-number",
    title: "Palindrome Number",
    difficulty: "Easy",
    content:
      "Given an integer x, return true if x is a palindrome integer.\nAn integer is a palindrome when it reads the same backward as forward.\n\n**Example 1:**\nInput: x = 121\nOutput: true\n\n**Example 2:**\nInput: x = -121\nOutput: false\n\n**Example 3:**\nInput: x = 10\nOutput: false",
    solutions: {
      "C++":
        "class Solution {\npublic:\n    bool isPalindrome(int x) {\n        if(x < 0) return false;\n        int original = x, rev = 0;\n        while(x != 0) {\n            int pop = x % 10;\n            x /= 10;\n            rev = rev * 10 + pop;\n        }\n        return original == rev;\n    }\n};",
      Python:
        "class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        if x < 0:\n            return False\n        return str(x) == str(x)[::-1]",
      Java: "class Solution {\n    public boolean isPalindrome(int x) {\n        if(x < 0) return false;\n        int original = x, rev = 0;\n        while(x != 0) {\n            int pop = x % 10;\n            x /= 10;\n            rev = rev * 10 + pop;\n        }\n        return original == rev;\n    }\n}",
      "C#": "public class Solution {\n    public bool IsPalindrome(int x) {\n        if(x < 0) return false;\n        int original = x, rev = 0;\n        while(x != 0) {\n            int pop = x % 10;\n            x /= 10;\n            rev = rev * 10 + pop;\n        }\n        return original == rev;\n    }\n}",
      JavaScript:
        "var isPalindrome = function(x) {\n    if(x < 0) return false;\n    let s = x.toString();\n    return s === s.split('').reverse().join('');\n};",
      TypeScript:
        "function isPalindrome(x: number): boolean {\n    if(x < 0) return false;\n    let s = x.toString();\n    return s === s.split('').reverse().join('');\n}\nexport { isPalindrome };",
    },
    tags: ["Math"],
    status: "Not Attempted",
    testCases: [
      {
        input: { x: 121 },
        output: true,
        description: "Palindrome positive number.",
      },
      {
        input: { x: -121 },
        output: false,
        description: "Negative numbers are not palindromic.",
      },
      {
        input: { x: 10 },
        output: false,
        description: "Numbers ending with zero (except 0) are not palindromic.",
      },
      {
        input: { x: 0 },
        output: true,
        description: "Zero is considered a palindrome.",
      },
      {
        input: { x: 12321 },
        output: true,
        description: "Odd-length palindrome.",
      },
    ],
  },
  {
    slug: "regular-expression-matching",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    content:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.\n\n'.' Matches any single character.\n'*' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).\n\n**Example 1:**\nInput: s = \"aa\", p = \"a\"\nOutput: false\nExplanation: 'a' does not match the entire string 'aa'.\n\n**Example 2:**\nInput: s = \"aa\", p = \"a*\"\nOutput: true\nExplanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes 'aa'.\n\n**Example 3:**\nInput: s = \"ab\", p = \".*\"\nOutput: true\nExplanation: '.*' means 'zero or more (*) of any character (.)'.",
    solutions: {
      "C++":
        "class Solution {\npublic:\n    bool isMatch(string s, string p) {\n        int m = s.size(), n = p.size();\n        vector<vector<bool>> dp(m+1, vector<bool>(n+1, false));\n        dp[0][0] = true;\n        for (int j = 1; j <= n; j++) {\n            if(p[j-1] == '*')\n                dp[0][j] = dp[0][j-2];\n        }\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if(p[j-1] == s[i-1] || p[j-1] == '.')\n                    dp[i][j] = dp[i-1][j-1];\n                else if(p[j-1] == '*') {\n                    dp[i][j] = dp[i][j-2];\n                    if(p[j-2] == s[i-1] || p[j-2] == '.')\n                        dp[i][j] = dp[i][j] || dp[i-1][j];\n                }\n            }\n        }\n        return dp[m][n];\n    }\n};",
      Python:
        "class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        m, n = len(s), len(p)\n        dp = [[False]*(n+1) for _ in range(m+1)]\n        dp[0][0] = True\n        for j in range(1, n+1):\n            if p[j-1] == '*':\n                dp[0][j] = dp[0][j-2]\n        for i in range(1, m+1):\n            for j in range(1, n+1):\n                if p[j-1] == s[i-1] or p[j-1] == '.':\n                    dp[i][j] = dp[i-1][j-1]\n                elif p[j-1] == '*':\n                    dp[i][j] = dp[i][j-2]\n                    if p[j-2] == s[i-1] or p[j-2] == '.':\n                        dp[i][j] = dp[i][j] or dp[i-1][j]\n        return dp[m][n]\n",
      Java: "class Solution {\n    public boolean isMatch(String s, String p) {\n        int m = s.length(), n = p.length();\n        boolean[][] dp = new boolean[m+1][n+1];\n        dp[0][0] = true;\n        for (int j = 1; j <= n; j++) {\n            if(p.charAt(j-1) == '*')\n                dp[0][j] = dp[0][j-2];\n        }\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if(p.charAt(j-1) == s.charAt(i-1) || p.charAt(j-1) == '.')\n                    dp[i][j] = dp[i-1][j-1];\n                else if(p.charAt(j-1) == '*') {\n                    dp[i][j] = dp[i][j-2];\n                    if(p.charAt(j-2) == s.charAt(i-1) || p.charAt(j-2) == '.')\n                        dp[i][j] = dp[i][j] || dp[i-1][j];\n                }\n            }\n        }\n        return dp[m][n];\n    }\n}",
      "C#": "public class Solution {\n    public bool IsMatch(string s, string p) {\n        int m = s.Length, n = p.Length;\n        bool[,] dp = new bool[m+1, n+1];\n        dp[0,0] = true;\n        for(int j = 1; j <= n; j++){\n            if(p[j-1] == '*')\n                dp[0,j] = dp[0,j-2];\n        }\n        for(int i = 1; i <= m; i++){\n            for(int j = 1; j <= n; j++){\n                if(p[j-1] == s[i-1] || p[j-1] == '.')\n                    dp[i,j] = dp[i-1,j-1];\n                else if(p[j-1] == '*'){\n                    dp[i,j] = dp[i,j-2];\n                    if(p[j-2] == s[i-1] || p[j-2] == '.')\n                        dp[i,j] = dp[i,j] || dp[i-1,j];\n                }\n            }\n        }\n        return dp[m,n];\n    }\n}",
      JavaScript:
        "var isMatch = function(s, p) {\n    const m = s.length, n = p.length;\n    const dp = Array.from(Array(m+1), () => Array(n+1).fill(false));\n    dp[0][0] = true;\n    for(let j = 1; j <= n; j++){\n        if(p[j-1] === '*')\n            dp[0][j] = dp[0][j-2];\n    }\n    for(let i = 1; i <= m; i++){\n        for(let j = 1; j <= n; j++){\n            if(p[j-1] === s[i-1] || p[j-1] === '.')\n                dp[i][j] = dp[i-1][j-1];\n            else if(p[j-1] === '*'){\n                dp[i][j] = dp[i][j-2];\n                if(p[j-2] === s[i-1] || p[j-2] === '.')\n                    dp[i][j] = dp[i][j] || dp[i-1][j];\n            }\n        }\n    }\n    return dp[m][n];\n};",
      TypeScript:
        "function isMatch(s: string, p: string): boolean {\n    const m = s.length, n = p.length;\n    const dp: boolean[][] = Array.from({length: m+1}, () => Array(n+1).fill(false));\n    dp[0][0] = true;\n    for(let j = 1; j <= n; j++){\n        if(p[j-1] === '*')\n            dp[0][j] = dp[0][j-2];\n    }\n    for(let i = 1; i <= m; i++){\n        for(let j = 1; j <= n; j++){\n            if(p[j-1] === s[i-1] || p[j-1] === '.')\n                dp[i][j] = dp[i-1][j-1];\n            else if(p[j-1] === '*'){\n                dp[i][j] = dp[i][j-2];\n                if(p[j-2] === s[i-1] || p[j-2] === '.')\n                    dp[i][j] = dp[i][j] || dp[i-1][j];\n            }\n        }\n    }\n    return dp[m][n];\n}\nexport { isMatch };",
    },
    tags: ["String", "Dynamic Programming", "Backtracking"],
    status: "Not Attempted",
    testCases: [
      {
        input: { s: "aa", p: "a" },
        output: false,
        description: "Pattern does not match the entire string.",
      },
      {
        input: { s: "aa", p: "a*" },
        output: true,
        description: "Star allows for repeated characters; should match.",
      },
      {
        input: { s: "ab", p: ".*" },
        output: true,
        description: "'.*' matches any sequence.",
      },
      {
        input: { s: "aab", p: "c*a*b" },
        output: true,
        description:
          "Complex pattern with '*' operators matching zero occurrences.",
      },
      {
        input: { s: "mississippi", p: "mis*is*p*." },
        output: false,
        description: "Pattern does not fully match the string.",
      },
    ],
  },
  {
    slug: "zigzag-conversion",
    title: "Zigzag Conversion",
    difficulty: "Medium",
    content:
      'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this:\n\nP   A   H   N\nA P L S I I G\nY   I   R\n\nAnd then read line by line: "PAHNAPLSIIGYIR".\n\nWrite the code that will take a string and make this conversion given a number of rows.\n\n**Example 1:**\nInput: s = "PAYPALISHIRING", numRows = 3\nOutput: "PAHNAPLSIIGYIR"\n\n**Example 2:**\nInput: s = "PAYPALISHIRING", numRows = 4\nOutput: "PINALSIGYAHRPI"',
    solutions: {
      "C++":
        "class Solution {\npublic:\n    string convert(string s, int numRows) {\n        if(numRows == 1) return s;\n        vector<string> rows(min(numRows, int(s.size())));\n        int curRow = 0;\n        bool goingDown = false;\n        for(char c : s){\n            rows[curRow] += c;\n            if(curRow == 0 || curRow == numRows - 1)\n                goingDown = !goingDown;\n            curRow += goingDown ? 1 : -1;\n        }\n        string ret;\n        for(string row : rows)\n            ret += row;\n        return ret;\n    }\n};",
      Python:
        "class Solution:\n    def convert(self, s: str, numRows: int) -> str:\n        if numRows == 1 or numRows >= len(s):\n            return s\n        rows = [''] * numRows\n        curRow = 0\n        goingDown = False\n        for c in s:\n            rows[curRow] += c\n            if curRow == 0 or curRow == numRows - 1:\n                goingDown = not goingDown\n            curRow += 1 if goingDown else -1\n        return ''.join(rows)",
      Java: "class Solution {\n    public String convert(String s, int numRows) {\n        if(numRows == 1 || numRows >= s.length()) return s;\n        StringBuilder[] rows = new StringBuilder[Math.min(numRows, s.length())];\n        for(int i = 0; i < rows.length; i++){\n            rows[i] = new StringBuilder();\n        }\n        int curRow = 0;\n        boolean goingDown = false;\n        for(char c : s.toCharArray()){\n            rows[curRow].append(c);\n            if(curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;\n            curRow += goingDown ? 1 : -1;\n        }\n        StringBuilder ret = new StringBuilder();\n        for(StringBuilder row : rows) ret.append(row);\n        return ret.toString();\n    }\n}",
      "C#": 'public class Solution {\n    public string Convert(string s, int numRows) {\n        if(numRows == 1 || numRows >= s.Length) return s;\n        string[] rows = new string[Math.Min(numRows, s.Length)];\n        for(int i = 0; i < rows.Length; i++){\n            rows[i] = "";\n        }\n        int curRow = 0;\n        bool goingDown = false;\n        foreach(char c in s) {\n            rows[curRow] += c;\n            if(curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;\n            curRow += goingDown ? 1 : -1;\n        }\n        return string.Join("", rows);\n    }\n}',
      JavaScript:
        'var convert = function(s, numRows) {\n    if(numRows === 1 || numRows >= s.length) return s;\n    let rows = new Array(Math.min(numRows, s.length)).fill("");\n    let curRow = 0;\n    let goingDown = false;\n    for(let c of s){\n        rows[curRow] += c;\n        if(curRow === 0 || curRow === numRows - 1) goingDown = !goingDown;\n        curRow += goingDown ? 1 : -1;\n    }\n    return rows.join("");\n};',
      TypeScript:
        'function convert(s: string, numRows: number): string {\n    if(numRows === 1 || numRows >= s.length) return s;\n    let rows: string[] = new Array(Math.min(numRows, s.length)).fill("");\n    let curRow = 0;\n    let goingDown = false;\n    for(let c of s){\n        rows[curRow] += c;\n        if(curRow === 0 || curRow === numRows - 1) goingDown = !goingDown;\n        curRow += goingDown ? 1 : -1;\n    }\n    return rows.join("");\n}\nexport { convert };',
    },
    tags: ["String"],
    status: "Not Attempted",
    testCases: [
      {
        input: { s: "PAYPALISHIRING", numRows: 3 },
        output: "PAHNAPLSIIGYIR",
        description: "Standard zigzag conversion with 3 rows.",
      },
      {
        input: { s: "PAYPALISHIRING", numRows: 4 },
        output: "PINALSIGYAHRPI",
        description: "Zigzag conversion with 4 rows.",
      },
      {
        input: { s: "A", numRows: 1 },
        output: "A",
        description: "Edge case: single character with one row.",
      },
      {
        input: { s: "", numRows: 3 },
        output: "",
        description: "Edge case: empty string.",
      },
      {
        input: { s: "ABC", numRows: 2 },
        output: "ACB",
        description: "Test case with string length less than rows*2.",
      },
    ],
  },
];

const difficultyMap: Record<"Easy" | "Medium" | "Hard", ProblemDifficulty> = {
  Easy: ProblemDifficulty.EASY,
  Medium: ProblemDifficulty.MEDIUM,
  Hard: ProblemDifficulty.HARD,
};

const statusMap: Record<"Attempted" | "Not Attempted" | "Solved", Status> = {
  "Not Attempted": Status.NOT_ATTEMPTED,
  Attempted: Status.ATTEMPTED,
  Solved: Status.SOLVED,
};

const formattedProblems = problems.map((problem) => ({
  ...problem,
  difficulty: difficultyMap[problem.difficulty as "Easy" | "Medium" | "Hard"],
  status: statusMap[problem.status as "Attempted" | "Not Attempted" | "Solved"],
}));

const main = async () => {
  console.log("Seeding database...");

  for (const problem of formattedProblems) {
    await prismaClient.problem.create({ data: problem });
  }

  console.log("Seeding completed!");
};

main()
  .catch((e) => console.error("Error seeding database: ", e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });
