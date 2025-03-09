import prismaClient from "../src/config/prismaClient";
import { ProblemDifficulty, Status } from "@prisma/client";

const problemsSet1 = [
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

const problemsSet2 = [
  {
    slug: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    content:
      "Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i are (i, 0) and (i, ai). Find two lines, which together with the x-axis forms a container, such that the container contains the most water. Note: You may not slant the container.\n\n**Example:**\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
    solutions: {
      "C++":
        "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int i = 0, j = height.size()-1, maxArea = 0;\n        while(i < j) {\n            int area = min(height[i], height[j]) * (j - i);\n            maxArea = max(maxArea, area);\n            if(height[i] < height[j])\n                i++;\n            else\n                j--;\n        }\n        return maxArea;\n    }\n};",
      Python:
        "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        i, j = 0, len(height)-1\n        max_area = 0\n        while i < j:\n            max_area = max(max_area, min(height[i], height[j]) * (j - i))\n            if height[i] < height[j]:\n                i += 1\n            else:\n                j -= 1\n        return max_area",
      Java: "class Solution {\n    public int maxArea(int[] height) {\n        int i = 0, j = height.length - 1, maxArea = 0;\n        while(i < j) {\n            int area = Math.min(height[i], height[j]) * (j - i);\n            maxArea = Math.max(maxArea, area);\n            if(height[i] < height[j])\n                i++;\n            else\n                j--;\n        }\n        return maxArea;\n    }\n}",
      "C#": "public class Solution {\n    public int MaxArea(int[] height) {\n        int i = 0, j = height.Length - 1, maxArea = 0;\n        while(i < j) {\n            int area = Math.Min(height[i], height[j]) * (j - i);\n            maxArea = Math.Max(maxArea, area);\n            if(height[i] < height[j])\n                i++;\n            else\n                j--;\n        }\n        return maxArea;\n    }\n}",
      JavaScript:
        "var maxArea = function(height) {\n    let i = 0, j = height.length - 1, maxArea = 0;\n    while(i < j) {\n        const area = Math.min(height[i], height[j]) * (j - i);\n        maxArea = Math.max(maxArea, area);\n        if(height[i] < height[j]) i++;\n        else j--;\n    }\n    return maxArea;\n};",
      TypeScript:
        "function maxArea(height: number[]): number {\n    let i = 0, j = height.length - 1, maxArea = 0;\n    while(i < j) {\n        const area = Math.min(height[i], height[j]) * (j - i);\n        maxArea = Math.max(maxArea, area);\n        if(height[i] < height[j]) i++;\n        else j--;\n    }\n    return maxArea;\n}\nexport { maxArea };",
    },
    tags: ["Array", "Two Pointers"],
    status: "Not Attempted",
    testCases: [
      {
        input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
        output: 49,
        description: "Standard test case.",
      },
      {
        input: { height: [1, 1] },
        output: 1,
        description: "Minimal container test.",
      },
      {
        input: { height: [4, 3, 2, 1, 4] },
        output: 16,
        description: "Container with equal height at ends.",
      },
      {
        input: { height: [1, 2, 1] },
        output: 2,
        description: "Maximum area not at ends.",
      },
      {
        input: { height: [0, 0, 0, 0] },
        output: 0,
        description: "All zeros yield zero area.",
      },
    ],
  },
  {
    slug: "integer-to-roman",
    title: "Integer to Roman",
    difficulty: "Medium",
    content:
      'Given an integer, convert it to a Roman numeral. Input is guaranteed to be within the range from 1 to 3999.\n\n**Example:**\nInput: 58\nOutput: "LVIII"',
    solutions: {
      "C++":
        'class Solution {\npublic:\n    string intToRoman(int num) {\n        vector<pair<int, string>> val = {\n            {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},\n            {100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},\n            {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}\n        };\n        string res;\n        for(auto &p: val) {\n            while(num >= p.first) {\n                res += p.second;\n                num -= p.first;\n            }\n        }\n        return res;\n    }\n};',
      Python:
        'class Solution:\n    def intToRoman(self, num: int) -> str:\n        vals = [\n            (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),\n            (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),\n            (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")\n        ]\n        res = ""\n        for value, symbol in vals:\n            while num >= value:\n                res += symbol\n                num -= value\n        return res',
      Java: 'class Solution {\n    public String intToRoman(int num) {\n        int[] values = {1000,900,500,400,100,90,50,40,10,9,5,4,1};\n        String[] symbols = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < values.length && num > 0; i++) {\n            while (num >= values[i]) {\n                num -= values[i];\n                sb.append(symbols[i]);\n            }\n        }\n        return sb.toString();\n    }\n}',
      "C#": 'public class Solution {\n    public string IntToRoman(int num) {\n        (int, string)[] vals = new (int, string)[] {\n            (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),\n            (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),\n            (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")\n        };\n        StringBuilder sb = new StringBuilder();\n        foreach (var (value, symbol) in vals) {\n            while(num >= value) {\n                sb.Append(symbol);\n                num -= value;\n            }\n        }\n        return sb.ToString();\n    }\n}',
      JavaScript:
        'var intToRoman = function(num) {\n    const vals = [\n        [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],\n        [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],\n        [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]\n    ];\n    let res = "";\n    for(let [value, symbol] of vals) {\n        while(num >= value) {\n            res += symbol;\n            num -= value;\n        }\n    }\n    return res;\n};',
      TypeScript:
        'function intToRoman(num: number): string {\n    const vals: [number, string][] = [\n        [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],\n        [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],\n        [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]\n    ];\n    let res = "";\n    for (let [value, symbol] of vals) {\n        while(num >= value) {\n            res += symbol;\n            num -= value;\n        }\n    }\n    return res;\n}\nexport { intToRoman };',
    },
    tags: ["Math", "String"],
    status: "Not Attempted",
    testCases: [
      {
        input: { num: 3 },
        output: "III",
        description: "Simple conversion for small number.",
      },
      {
        input: { num: 4 },
        output: "IV",
        description: "Subtractive notation example.",
      },
      {
        input: { num: 9 },
        output: "IX",
        description: "Subtractive notation example.",
      },
      {
        input: { num: 58 },
        output: "LVIII",
        description: "Mixed numeral conversion.",
      },
      {
        input: { num: 1994 },
        output: "MCMXCIV",
        description: "Complex numeral conversion.",
      },
    ],
  },
  {
    slug: "roman-to-integer",
    title: "Roman to Integer",
    difficulty: "Easy",
    content:
      'Given a Roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.\n\n**Example:**\nInput: "MCMXCIV"\nOutput: 1994',
    solutions: {
      "C++":
        "class Solution {\npublic:\n    int romanToInt(string s) {\n        unordered_map<char,int> values = {\n            {'I', 1}, {'V', 5}, {'X', 10},\n            {'L', 50}, {'C', 100}, {'D', 500},\n            {'M', 1000}\n        };\n        int sum = 0;\n        for (int i = 0; i < s.size(); i++) {\n            if(i+1 < s.size() && values[s[i]] < values[s[i+1]])\n                sum -= values[s[i]];\n            else\n                sum += values[s[i]];\n        }\n        return sum;\n    }\n};",
      Python:
        "class Solution:\n    def romanToInt(self, s: str) -> int:\n        values = {'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000}\n        total = 0\n        for i in range(len(s)):\n            if i+1 < len(s) and values[s[i]] < values[s[i+1]]:\n                total -= values[s[i]]\n            else:\n                total += values[s[i]]\n        return total",
      Java: "class Solution {\n    public int romanToInt(String s) {\n        Map<Character, Integer> values = new HashMap<>();\n        values.put('I', 1); values.put('V', 5); values.put('X', 10);\n        values.put('L', 50); values.put('C', 100); values.put('D', 500);\n        values.put('M', 1000);\n        int total = 0;\n        for (int i = 0; i < s.length(); i++) {\n            if(i+1 < s.length() && values.get(s.charAt(i)) < values.get(s.charAt(i+1)))\n                total -= values.get(s.charAt(i));\n            else\n                total += values.get(s.charAt(i));\n        }\n        return total;\n    }\n}",
      "C#": "public class Solution {\n    public int RomanToInt(string s) {\n        Dictionary<char, int> values = new Dictionary<char, int>() {\n            {'I', 1}, {'V', 5}, {'X', 10},\n            {'L', 50}, {'C', 100}, {'D', 500},\n            {'M', 1000}\n        };\n        int total = 0;\n        for(int i = 0; i < s.Length; i++){\n            if(i+1 < s.Length && values[s[i]] < values[s[i+1]])\n                total -= values[s[i]];\n            else\n                total += values[s[i]];\n        }\n        return total;\n    }\n}",
      JavaScript:
        "var romanToInt = function(s) {\n    const values = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};\n    let total = 0;\n    for(let i = 0; i < s.length; i++){\n        if(i+1 < s.length && values[s[i]] < values[s[i+1]])\n            total -= values[s[i]];\n        else\n            total += values[s[i]];\n    }\n    return total;\n};",
      TypeScript:
        "function romanToInt(s: string): number {\n    const values: {[key: string]: number} = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};\n    let total = 0;\n    for(let i = 0; i < s.length; i++){\n        if(i+1 < s.length && values[s[i]] < values[s[i+1]])\n            total -= values[s[i]];\n        else\n            total += values[s[i]];\n    }\n    return total;\n}\nexport { romanToInt };",
    },
    tags: ["Math", "String"],
    status: "Not Attempted",
    testCases: [
      {
        input: { s: "III" },
        output: 3,
        description: "Simple additive numeral.",
      },
      {
        input: { s: "IV" },
        output: 4,
        description: "Subtractive numeral.",
      },
      {
        input: { s: "IX" },
        output: 9,
        description: "Subtractive numeral.",
      },
      {
        input: { s: "LVIII" },
        output: 58,
        description: "Mixed numeral conversion.",
      },
      {
        input: { s: "MCMXCIV" },
        output: 1994,
        description: "Complex numeral conversion.",
      },
    ],
  },
  {
    slug: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    content:
      'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".\n\n**Example:**\nInput: ["flower","flow","flight"]\nOutput: "fl"',
    solutions: {
      "C++":
        'class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        if(strs.empty()) return "";\n        string prefix = strs[0];\n        for(int i = 1; i < strs.size(); i++){\n            while(strs[i].find(prefix) != 0)\n                prefix = prefix.substr(0, prefix.size()-1);\n            if(prefix.empty()) return "";\n        }\n        return prefix;\n    }\n};',
      Python:
        'class Solution:\n    def longestCommonPrefix(self, strs: List[str]) -> str:\n        if not strs: return ""\n        prefix = strs[0]\n        for s in strs[1:]:\n            while not s.startswith(prefix):\n                prefix = prefix[:-1]\n                if not prefix:\n                    return ""\n        return prefix',
      Java: 'class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        if(strs == null || strs.length == 0) return "";\n        String prefix = strs[0];\n        for(int i = 1; i < strs.length; i++){\n            while(strs[i].indexOf(prefix) != 0){\n                prefix = prefix.substring(0, prefix.length()-1);\n                if(prefix.isEmpty()) return "";\n            }\n        }\n        return prefix;\n    }\n}',
      "C#": 'public class Solution {\n    public string LongestCommonPrefix(string[] strs) {\n        if(strs == null || strs.Length == 0) return "";\n        string prefix = strs[0];\n        for(int i = 1; i < strs.Length; i++){\n            while(strs[i].IndexOf(prefix) != 0){\n                prefix = prefix.Substring(0, prefix.Length-1);\n                if(string.IsNullOrEmpty(prefix)) return "";\n            }\n        }\n        return prefix;\n    }\n}',
      JavaScript:
        'var longestCommonPrefix = function(strs) {\n    if(!strs || strs.length === 0) return "";\n    let prefix = strs[0];\n    for(let i = 1; i < strs.length; i++){\n        while(strs[i].indexOf(prefix) !== 0){\n            prefix = prefix.substring(0, prefix.length-1);\n            if(prefix === "") return "";\n        }\n    }\n    return prefix;\n};',
      TypeScript:
        'function longestCommonPrefix(strs: string[]): string {\n    if(!strs || strs.length === 0) return "";\n    let prefix = strs[0];\n    for(let i = 1; i < strs.length; i++){\n        while(strs[i].indexOf(prefix) !== 0){\n            prefix = prefix.substring(0, prefix.length-1);\n            if(prefix === "") return "";\n        }\n    }\n    return prefix;\n}\nexport { longestCommonPrefix };',
    },
    tags: ["String"],
    status: "Not Attempted",
    testCases: [
      {
        input: { strs: ["flower", "flow", "flight"] },
        output: "fl",
        description: "Common prefix exists.",
      },
      {
        input: { strs: ["dog", "racecar", "car"] },
        output: "",
        description: "No common prefix.",
      },
      {
        input: { strs: ["interspecies", "interstellar", "interstate"] },
        output: "inters",
        description: "Common prefix across words.",
      },
      {
        input: { strs: ["", "b"] },
        output: "",
        description: "Edge case with empty string.",
      },
      {
        input: { strs: [] },
        output: "",
        description: "Empty array returns empty string.",
      },
    ],
  },
  {
    slug: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    content:
      "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.\n\n**Example:**\nInput: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]",
    solutions: {
      "C++":
        "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        vector<vector<int>> res;\n        sort(nums.begin(), nums.end());\n        for (int i = 0; i < nums.size(); i++) {\n            if(i > 0 && nums[i] == nums[i-1]) continue;\n            int left = i+1, right = nums.size()-1;\n            while(left < right){\n                int sum = nums[i] + nums[left] + nums[right];\n                if(sum < 0) left++;\n                else if(sum > 0) right--;\n                else {\n                    res.push_back({nums[i], nums[left], nums[right]});\n                    while(left < right && nums[left] == nums[left+1]) left++;\n                    while(left < right && nums[right] == nums[right-1]) right--;\n                    left++; right--;\n                }\n            }\n        }\n        return res;\n    }\n};",
      Python:
        "class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        nums.sort()\n        res = []\n        for i in range(len(nums)):\n            if i > 0 and nums[i] == nums[i-1]:\n                continue\n            l, r = i+1, len(nums)-1\n            while l < r:\n                s = nums[i] + nums[l] + nums[r]\n                if s < 0:\n                    l += 1\n                elif s > 0:\n                    r -= 1\n                else:\n                    res.append([nums[i], nums[l], nums[r]])\n                    while l < r and nums[l] == nums[l+1]:\n                        l += 1\n                    while l < r and nums[r] == nums[r-1]:\n                        r -= 1\n                    l += 1\n                    r -= 1\n        return res",
      Java: "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        List<List<Integer>> res = new ArrayList<>();\n        Arrays.sort(nums);\n        for(int i = 0; i < nums.length; i++){\n            if(i > 0 && nums[i] == nums[i-1]) continue;\n            int left = i+1, right = nums.length - 1;\n            while(left < right){\n                int sum = nums[i] + nums[left] + nums[right];\n                if(sum < 0) left++;\n                else if(sum > 0) right--;\n                else {\n                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));\n                    while(left < right && nums[left] == nums[left+1]) left++;\n                    while(left < right && nums[right] == nums[right-1]) right--;\n                    left++;\n                    right--;\n                }\n            }\n        }\n        return res;\n    }\n}",
      "C#": "public class Solution {\n    public IList<IList<int>> ThreeSum(int[] nums) {\n        var res = new List<IList<int>>();\n        Array.Sort(nums);\n        for(int i = 0; i < nums.Length; i++){\n            if(i > 0 && nums[i] == nums[i-1]) continue;\n            int left = i+1, right = nums.Length - 1;\n            while(left < right){\n                int sum = nums[i] + nums[left] + nums[right];\n                if(sum < 0) left++;\n                else if(sum > 0) right--;\n                else {\n                    res.Add(new List<int>{nums[i], nums[left], nums[right]});\n                    while(left < right && nums[left] == nums[left+1]) left++;\n                    while(left < right && nums[right] == nums[right-1]) right--;\n                    left++; right--;\n                }\n            }\n        }\n        return res;\n    }\n}",
      JavaScript:
        "var threeSum = function(nums) {\n    nums.sort((a, b) => a - b);\n    const res = [];\n    for(let i = 0; i < nums.length; i++){\n        if(i > 0 && nums[i] === nums[i-1]) continue;\n        let left = i+1, right = nums.length - 1;\n        while(left < right){\n            const sum = nums[i] + nums[left] + nums[right];\n            if(sum < 0) left++;\n            else if(sum > 0) right--;\n            else {\n                res.push([nums[i], nums[left], nums[right]]);\n                while(left < right && nums[left] === nums[left+1]) left++;\n                while(left < right && nums[right] === nums[right-1]) right--;\n                left++; right--;\n            }\n        }\n    }\n    return res;\n};",
      TypeScript:
        "function threeSum(nums: number[]): number[][] {\n    nums.sort((a, b) => a - b);\n    const res: number[][] = [];\n    for(let i = 0; i < nums.length; i++){\n        if(i > 0 && nums[i] === nums[i-1]) continue;\n        let left = i+1, right = nums.length - 1;\n        while(left < right){\n            const sum = nums[i] + nums[left] + nums[right];\n            if(sum < 0) left++;\n            else if(sum > 0) right--;\n            else {\n                res.push([nums[i], nums[left], nums[right]]);\n                while(left < right && nums[left] === nums[left+1]) left++;\n                while(left < right && nums[right] === nums[right-1]) right--;\n                left++; right--;\n            }\n        }\n    }\n    return res;\n}\nexport { threeSum };",
    },
    tags: ["Array", "Two Pointers", "Sorting"],
    status: "Not Attempted",
    testCases: [
      {
        input: { nums: [-1, 0, 1, 2, -1, -4] },
        output: [
          [-1, -1, 2],
          [-1, 0, 1],
        ],
        description: "Example test case.",
      },
      {
        input: { nums: [0, 0, 0, 0] },
        output: [[0, 0, 0]],
        description: "All zeros.",
      },
      {
        input: { nums: [] },
        output: [],
        description: "Empty array returns empty list.",
      },
      {
        input: { nums: [-2, 0, 1, 1, 2] },
        output: [
          [-2, 0, 2],
          [-2, 1, 1],
        ],
        description: "Multiple triplets with duplicates.",
      },
      {
        input: { nums: [-1, 0, 1, 0] },
        output: [[-1, 0, 1]],
        description: "Triplet with duplicate zero.",
      },
    ],
  },
  {
    slug: "3sum-closest",
    title: "3Sum Closest",
    difficulty: "Medium",
    content:
      "Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.\n\n**Example:**\nInput: nums = [-1,2,1,-4], target = 1\nOutput: 2",
    solutions: {
      "C++":
        "class Solution {\npublic:\n    int threeSumClosest(vector<int>& nums, int target) {\n        sort(nums.begin(), nums.end());\n        int closest = nums[0] + nums[1] + nums[2];\n        for (int i = 0; i < nums.size()-2; i++) {\n            int left = i+1, right = nums.size()-1;\n            while(left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if(abs(target - sum) < abs(target - closest))\n                    closest = sum;\n                if(sum < target) left++;\n                else if(sum > target) right--;\n                else return sum;\n            }\n        }\n        return closest;\n    }\n};",
      Python:
        "class Solution:\n    def threeSumClosest(self, nums: List[int], target: int) -> int:\n        nums.sort()\n        closest = sum(nums[:3])\n        for i in range(len(nums)-2):\n            left, right = i+1, len(nums)-1\n            while left < right:\n                current = nums[i] + nums[left] + nums[right]\n                if abs(target - current) < abs(target - closest):\n                    closest = current\n                if current < target:\n                    left += 1\n                elif current > target:\n                    right -= 1\n                else:\n                    return current\n        return closest",
      Java: "class Solution {\n    public int threeSumClosest(int[] nums, int target) {\n        Arrays.sort(nums);\n        int closest = nums[0] + nums[1] + nums[2];\n        for(int i = 0; i < nums.length - 2; i++){\n            int left = i+1, right = nums.length - 1;\n            while(left < right){\n                int sum = nums[i] + nums[left] + nums[right];\n                if(Math.abs(target - sum) < Math.abs(target - closest))\n                    closest = sum;\n                if(sum < target)\n                    left++;\n                else if(sum > target)\n                    right--;\n                else\n                    return sum;\n            }\n        }\n        return closest;\n    }\n}",
      "C#": "public class Solution {\n    public int ThreeSumClosest(int[] nums, int target) {\n        Array.Sort(nums);\n        int closest = nums[0] + nums[1] + nums[2];\n        for(int i = 0; i < nums.Length - 2; i++){\n            int left = i+1, right = nums.Length - 1;\n            while(left < right){\n                int sum = nums[i] + nums[left] + nums[right];\n                if(Math.Abs(target - sum) < Math.Abs(target - closest))\n                    closest = sum;\n                if(sum < target)\n                    left++;\n                else if(sum > target)\n                    right--;\n                else\n                    return sum;\n            }\n        }\n        return closest;\n    }\n}",
      JavaScript:
        "var threeSumClosest = function(nums, target) {\n    nums.sort((a, b) => a - b);\n    let closest = nums[0] + nums[1] + nums[2];\n    for(let i = 0; i < nums.length - 2; i++){\n        let left = i+1, right = nums.length - 1;\n        while(left < right){\n            let sum = nums[i] + nums[left] + nums[right];\n            if(Math.abs(target - sum) < Math.abs(target - closest))\n                closest = sum;\n            if(sum < target)\n                left++;\n            else if(sum > target)\n                right--;\n            else\n                return sum;\n        }\n    }\n    return closest;\n};",
      TypeScript:
        "function threeSumClosest(nums: number[], target: number): number {\n    nums.sort((a, b) => a - b);\n    let closest = nums[0] + nums[1] + nums[2];\n    for(let i = 0; i < nums.length - 2; i++){\n        let left = i+1, right = nums.length - 1;\n        while(left < right){\n            let sum = nums[i] + nums[left] + nums[right];\n            if(Math.abs(target - sum) < Math.abs(target - closest))\n                closest = sum;\n            if(sum < target)\n                left++;\n            else if(sum > target)\n                right--;\n            else\n                return sum;\n        }\n    }\n    return closest;\n}\nexport { threeSumClosest };",
    },
    tags: ["Array", "Two Pointers", "Sorting"],
    status: "Not Attempted",
    testCases: [
      {
        input: { nums: [-1, 2, 1, -4], target: 1 },
        output: 2,
        description: "Example test case.",
      },
      {
        input: { nums: [0, 0, 0], target: 1 },
        output: 0,
        description: "All zeros, target not reached.",
      },
      {
        input: { nums: [1, 1, 1, 0], target: -100 },
        output: 2,
        description: "Negative target, closest sum.",
      },
      {
        input: { nums: [1, 2, 5, 10, 11], target: 12 },
        output: 13,
        description: "Closest sum greater than target.",
      },
      {
        input: { nums: [1, 1, -1, -1, 3], target: -1 },
        output: -1,
        description: "Exact match exists.",
      },
    ],
  },
  {
    slug: "letter-combinations-of-a-phone-number",
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    content:
      'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.\n\n**Example:**\nInput: digits = "23"\nOutput: ["ad","ae","af","bd","be","bf","cd","ce","cf"]',
    solutions: {
      "C++":
        'class Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        if(digits.empty()) return {};\n        vector<string> mapping = {"0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};\n        vector<string> result;\n        function<void(int, string)> backtrack = [&](int index, string path) {\n            if(index == digits.size()){\n                result.push_back(path);\n                return;\n            }\n            string letters = mapping[digits[index]-\'0\'];\n            for(char c : letters)\n                backtrack(index+1, path + c);\n        };\n        backtrack(0, "");\n        return result;\n    }\n};',
      Python:
        'class Solution:\n    def letterCombinations(self, digits: str) -> List[str]:\n        if not digits:\n            return []\n        phone = {\n            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",\n            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"\n        }\n        res = []\n        def backtrack(index, path):\n            if index == len(digits):\n                res.append(path)\n                return\n            for char in phone[digits[index]]:\n                backtrack(index+1, path+char)\n        backtrack(0, "")\n        return res',
      Java: 'class Solution {\n    public List<String> letterCombinations(String digits) {\n        List<String> res = new ArrayList<>();\n        if(digits == null || digits.length() == 0) return res;\n        String[] mapping = {"0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};\n        backtrack(res, digits, "", mapping);\n        return res;\n    }\n    private void backtrack(List<String> res, String digits, String path, String[] mapping){\n        if(path.length() == digits.length()){\n            res.add(path);\n            return;\n        }\n        String letters = mapping[digits.charAt(path.length()) - \'0\'];\n        for(char c : letters.toCharArray()){\n            backtrack(res, digits, path + c, mapping);\n        }\n    }\n}',
      "C#": 'public class Solution {\n    public IList<string> LetterCombinations(string digits) {\n        List<string> res = new List<string>();\n        if(string.IsNullOrEmpty(digits)) return res;\n        string[] mapping = new string[] {"0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};\n        void Backtrack(int index, string path) {\n            if(path.Length == digits.Length) {\n                res.Add(path);\n                return;\n            }\n            string letters = mapping[digits[index]-\'0\'];\n            foreach(char c in letters)\n                Backtrack(index+1, path+c);\n        }\n        Backtrack(0, "");\n        return res;\n    }\n}',
      JavaScript:
        'var letterCombinations = function(digits) {\n    if(!digits) return [];\n    const mapping = ["0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];\n    const res = [];\n    function backtrack(index, path) {\n        if(path.length === digits.length) {\n            res.push(path);\n            return;\n        }\n        const letters = mapping[parseInt(digits[index])];\n        for(let char of letters) {\n            backtrack(index+1, path+char);\n        }\n    }\n    backtrack(0, "");\n    return res;\n};',
      TypeScript:
        'function letterCombinations(digits: string): string[] {\n    if(!digits) return [];\n    const mapping: string[] = ["0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];\n    const res: string[] = [];\n    function backtrack(index: number, path: string) {\n        if(path.length === digits.length) {\n            res.push(path);\n            return;\n        }\n        const letters = mapping[parseInt(digits[index])];\n        for(let char of letters) {\n            backtrack(index+1, path+char);\n        }\n    }\n    backtrack(0, "");\n    return res;\n}\nexport { letterCombinations };',
    },
    tags: ["Backtracking", "String"],
    status: "Not Attempted",
    testCases: [
      {
        input: { digits: "23" },
        output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"],
        description: "Standard test case.",
      },
      {
        input: { digits: "" },
        output: [],
        description: "Empty input returns empty list.",
      },
      {
        input: { digits: "2" },
        output: ["a", "b", "c"],
        description: "Single digit test case.",
      },
      {
        input: { digits: "79" },
        output:
          "[combinations corresponding to digits with 4 letters mapping for '7']",
        description: "Test case for digit '7' with four letters.",
      },
      {
        input: { digits: "234" },
        output: "[expected combinations]",
        description: "Test with three digits.",
      },
    ],
  },
  {
    slug: "4sum",
    title: "4Sum",
    difficulty: "Medium",
    content:
      "Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:\n- 0 <= a, b, c, d < n\n- a, b, c, and d are distinct\n- nums[a] + nums[b] + nums[c] + nums[d] == target\n\nYou may return the answer in any order.\n\n**Example:**\nInput: nums = [1,0,-1,0,-2,2], target = 0\nOutput: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]",
    solutions: {
      "C++":
        "class Solution {\npublic:\n    vector<vector<int>> fourSum(vector<int>& nums, int target) {\n        vector<vector<int>> res;\n        sort(nums.begin(), nums.end());\n        int n = nums.size();\n        for(int i = 0; i < n-3; i++){\n            if(i > 0 && nums[i] == nums[i-1]) continue;\n            for(int j = i+1; j < n-2; j++){\n                if(j > i+1 && nums[j] == nums[j-1]) continue;\n                int left = j+1, right = n-1;\n                while(left < right){\n                    long sum = (long)nums[i] + nums[j] + nums[left] + nums[right];\n                    if(sum == target){\n                        res.push_back({nums[i], nums[j], nums[left], nums[right]});\n                        while(left < right && nums[left] == nums[left+1]) left++;\n                        while(left < right && nums[right] == nums[right-1]) right--;\n                        left++; right--;\n                    } else if(sum < target){\n                        left++;\n                    } else {\n                        right--;\n                    }\n                }\n            }\n        }\n        return res;\n    }\n};",
      Python:
        "class Solution:\n    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:\n        nums.sort()\n        res = []\n        n = len(nums)\n        for i in range(n-3):\n            if i > 0 and nums[i] == nums[i-1]:\n                continue\n            for j in range(i+1, n-2):\n                if j > i+1 and nums[j] == nums[j-1]:\n                    continue\n                left, right = j+1, n-1\n                while left < right:\n                    s = nums[i] + nums[j] + nums[left] + nums[right]\n                    if s == target:\n                        res.append([nums[i], nums[j], nums[left], nums[right]])\n                        while left < right and nums[left] == nums[left+1]:\n                            left += 1\n                        while left < right and nums[right] == nums[right-1]:\n                            right -= 1\n                        left += 1\n                        right -= 1\n                    elif s < target:\n                        left += 1\n                    else:\n                        right -= 1\n        return res",
      Java: "class Solution {\n    public List<List<Integer>> fourSum(int[] nums, int target) {\n        List<List<Integer>> res = new ArrayList<>();\n        Arrays.sort(nums);\n        int n = nums.length;\n        for(int i = 0; i < n-3; i++){\n            if(i > 0 && nums[i] == nums[i-1]) continue;\n            for(int j = i+1; j < n-2; j++){\n                if(j > i+1 && nums[j] == nums[j-1]) continue;\n                int left = j+1, right = n-1;\n                while(left < right){\n                    long sum = (long)nums[i] + nums[j] + nums[left] + nums[right];\n                    if(sum == target){\n                        res.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));\n                        while(left < right && nums[left] == nums[left+1]) left++;\n                        while(left < right && nums[right] == nums[right-1]) right--;\n                        left++; right--;\n                    } else if(sum < target){\n                        left++;\n                    } else {\n                        right--;\n                    }\n                }\n            }\n        }\n        return res;\n    }\n}",
      "C#": "public class Solution {\n    public IList<IList<int>> FourSum(int[] nums, int target) {\n        var res = new List<IList<int>>();\n        Array.Sort(nums);\n        int n = nums.Length;\n        for(int i = 0; i < n-3; i++){\n            if(i > 0 && nums[i] == nums[i-1]) continue;\n            for(int j = i+1; j < n-2; j++){\n                if(j > i+1 && nums[j] == nums[j-1]) continue;\n                int left = j+1, right = n-1;\n                while(left < right){\n                    long sum = (long)nums[i] + nums[j] + nums[left] + nums[right];\n                    if(sum == target){\n                        res.Add(new List<int>{nums[i], nums[j], nums[left], nums[right]});\n                        while(left < right && nums[left] == nums[left+1]) left++;\n                        while(left < right && nums[right] == nums[right-1]) right--;\n                        left++; right--;\n                    } else if(sum < target){\n                        left++;\n                    } else {\n                        right--;\n                    }\n                }\n            }\n        }\n        return res;\n    }\n}",
      JavaScript:
        "var fourSum = function(nums, target) {\n    nums.sort((a,b) => a - b);\n    const res = [];\n    const n = nums.length;\n    for(let i = 0; i < n-3; i++){\n        if(i > 0 && nums[i] === nums[i-1]) continue;\n        for(let j = i+1; j < n-2; j++){\n            if(j > i+1 && nums[j] === nums[j-1]) continue;\n            let left = j+1, right = n-1;\n            while(left < right){\n                let sum = nums[i] + nums[j] + nums[left] + nums[right];\n                if(sum === target){\n                    res.push([nums[i], nums[j], nums[left], nums[right]]);\n                    while(left < right && nums[left] === nums[left+1]) left++;\n                    while(left < right && nums[right] === nums[right-1]) right--;\n                    left++; right--;\n                } else if(sum < target){\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n    }\n    return res;\n};",
      TypeScript:
        "function fourSum(nums: number[], target: number): number[][] {\n    nums.sort((a, b) => a - b);\n    const res: number[][] = [];\n    const n = nums.length;\n    for(let i = 0; i < n-3; i++){\n        if(i > 0 && nums[i] === nums[i-1]) continue;\n        for(let j = i+1; j < n-2; j++){\n            if(j > i+1 && nums[j] === nums[j-1]) continue;\n            let left = j+1, right = n-1;\n            while(left < right){\n                const sum = nums[i] + nums[j] + nums[left] + nums[right];\n                if(sum === target){\n                    res.push([nums[i], nums[j], nums[left], nums[right]]);\n                    while(left < right && nums[left] === nums[left+1]) left++;\n                    while(left < right && nums[right] === nums[right-1]) right--;\n                    left++; right--;\n                } else if(sum < target){\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n    }\n    return res;\n}\nexport { fourSum };",
    },
    tags: ["Array", "Two Pointers", "Sorting"],
    status: "Not Attempted",
    testCases: [
      {
        input: { nums: [1, 0, -1, 0, -2, 2], target: 0 },
        output: [
          [-2, -1, 1, 2],
          [-2, 0, 0, 2],
          [-1, 0, 0, 1],
        ],
        description: "Example test case.",
      },
      {
        input: { nums: [2, 2, 2, 2, 2], target: 8 },
        output: [[2, 2, 2, 2]],
        description: "All identical numbers.",
      },
      {
        input: { nums: [], target: 0 },
        output: [],
        description: "Empty array returns empty list.",
      },
      {
        input: { nums: [0, 0, 0, 0], target: 1 },
        output: [],
        description: "No quadruplet sums to target.",
      },
      {
        input: { nums: [-3, -2, -1, 0, 0, 1, 2, 3], target: 0 },
        output: "[multiple valid quadruplets]",
        description: "Mixed positive and negative numbers.",
      },
    ],
  },
  {
    slug: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    content:
      "Given the head of a linked list, remove the nth node from the end of the list and return its head.\n\n**Example:**\nInput: head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]",
    solutions: {
      "C++":
        "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        ListNode dummy(0);\n        dummy.next = head;\n        ListNode* first = &dummy;\n        ListNode* second = &dummy;\n        for(int i = 0; i <= n; i++){\n            first = first->next;\n        }\n        while(first){\n            first = first->next;\n            second = second->next;\n        }\n        second->next = second->next->next;\n        return dummy.next;\n    }\n};",
      Python:
        "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:\n        dummy = ListNode(0, head)\n        first = dummy\n        second = dummy\n        for _ in range(n+1):\n            first = first.next\n        while first:\n            first = first.next\n            second = second.next\n        second.next = second.next.next\n        return dummy.next",
      Java: "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0, head);\n        ListNode first = dummy, second = dummy;\n        for(int i = 0; i <= n; i++){\n            first = first.next;\n        }\n        while(first != null){\n            first = first.next;\n            second = second.next;\n        }\n        second.next = second.next.next;\n        return dummy.next;\n    }\n}",
      "C#": "public class Solution {\n    public ListNode RemoveNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0) { next = head };\n        ListNode first = dummy, second = dummy;\n        for(int i = 0; i <= n; i++){\n            first = first.next;\n        }\n        while(first != null){\n            first = first.next;\n            second = second.next;\n        }\n        second.next = second.next.next;\n        return dummy.next;\n    }\n}",
      JavaScript:
        "var removeNthFromEnd = function(head, n) {\n    let dummy = { val: 0, next: head };\n    let first = dummy, second = dummy;\n    for(let i = 0; i <= n; i++){\n        first = first.next;\n    }\n    while(first){\n        first = first.next;\n        second = second.next;\n    }\n    second.next = second.next.next;\n    return dummy.next;\n};",
      TypeScript:
        "interface ListNode {\n    val: number;\n    next: ListNode | null;\n}\nfunction removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {\n    let dummy: ListNode = { val: 0, next: head };\n    let first: ListNode | null = dummy;\n    let second: ListNode | null = dummy;\n    for(let i = 0; i <= n; i++){\n        if(first) first = first.next;\n    }\n    while(first){\n        first = first.next;\n        second = second!.next;\n    }\n    if(second && second.next) {\n        second.next = second.next.next;\n    }\n    return dummy.next;\n}\nexport { removeNthFromEnd };",
    },
    tags: ["Linked List", "Two Pointers"],
    status: "Not Attempted",
    testCases: [
      {
        input: { head: [1, 2, 3, 4, 5], n: 2 },
        output: [1, 2, 3, 5],
        description: "Remove 2nd node from end.",
      },
      {
        input: { head: [1], n: 1 },
        output: [],
        description: "Remove only node in list.",
      },
      {
        input: { head: [1, 2], n: 1 },
        output: [1],
        description: "Remove last node.",
      },
      {
        input: { head: [1, 2], n: 2 },
        output: [2],
        description: "Remove first node.",
      },
      {
        input: { head: [1, 2, 3], n: 3 },
        output: [2, 3],
        description: "Remove head in longer list.",
      },
    ],
  },
  {
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    content:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\nAn input string is valid if:\n- Open brackets must be closed by the same type of brackets.\n- Open brackets must be closed in the correct order.\n\n**Example:**\nInput: s = \"()[]{}\"\nOutput: true",
    solutions: {
      "C++":
        "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for(char c : s){\n            if(c == '(') st.push(')');\n            else if(c == '{') st.push('}');\n            else if(c == '[') st.push(']');\n            else {\n                if(st.empty() || st.top() != c) return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};",
      Python:
        "class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = { '(': ')', '{': '}', '[': ']' }\n        for char in s:\n            if char in mapping:\n                stack.append(mapping[char])\n            else:\n                if not stack or stack.pop() != char:\n                    return false\n        return not stack",
      Java: "class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for(char c : s.toCharArray()){\n            if(c == '(') stack.push(')');\n            else if(c == '{') stack.push('}');\n            else if(c == '[') stack.push(']');\n            else if(stack.isEmpty() || stack.pop() != c)\n                return false;\n        }\n        return stack.isEmpty();\n    }\n}",
      "C#": "public class Solution {\n    public bool IsValid(string s) {\n        Stack<char> stack = new Stack<char>();\n        foreach(char c in s){\n            if(c == '(') stack.Push(')');\n            else if(c == '{') stack.Push('}');\n            else if(c == '[') stack.Push(']');\n            else {\n                if(stack.Count == 0 || stack.Pop() != c)\n                    return false;\n            }\n        }\n        return stack.Count == 0;\n    }\n}",
      JavaScript:
        "var isValid = function(s) {\n    const stack = [];\n    for(let c of s){\n        if(c === '(') stack.push(')');\n        else if(c === '{') stack.push('}');\n        else if(c === '[') stack.push(']');\n        else {\n            if(stack.length === 0 || stack.pop() !== c) return false;\n        }\n    }\n    return stack.length === 0;\n};",
      TypeScript:
        "function isValid(s: string): boolean {\n    const stack: string[] = [];\n    for(let c of s){\n        if(c === '(') stack.push(')');\n        else if(c === '{') stack.push('}');\n        else if(c === '[') stack.push(']');\n        else {\n            if(stack.length === 0 || stack.pop() !== c) return false;\n        }\n    }\n    return stack.length === 0;\n}\nexport { isValid };",
    },
    tags: ["String", "Stack"],
    status: "Not Attempted",
    testCases: [
      {
        input: { s: "()[]{}" },
        output: true,
        description: "All valid pairs.",
      },
      {
        input: { s: "([)]" },
        output: false,
        description: "Incorrectly nested brackets.",
      },
      {
        input: { s: "{" },
        output: false,
        description: "Single open bracket.",
      },
      {
        input: { s: "" },
        output: true,
        description: "Empty string is valid.",
      },
      {
        input: { s: "((()))" },
        output: true,
        description: "Nested valid parentheses.",
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

const formattedProblems1 = problemsSet1.map((problem) => ({
  ...problem,
  difficulty: difficultyMap[problem.difficulty as "Easy" | "Medium" | "Hard"],
  status: statusMap[problem.status as "Attempted" | "Not Attempted" | "Solved"],
}));

const formattedProblems2 = problemsSet2.map((problem) => ({
  ...problem,
  difficulty: difficultyMap[problem.difficulty as "Easy" | "Medium" | "Hard"],
  status: statusMap[problem.status as "Attempted" | "Not Attempted" | "Solved"],
}));

const main = async () => {
  console.log("Seeding database...");

  await prismaClient.$executeRawUnsafe(
    `TRUNCATE TABLE "problems" RESTART IDENTITY CASCADE;`
  );

  for (const problem1 of formattedProblems1) {
    await prismaClient.problem.create({ data: problem1 });
  }

  for (const problem2 of formattedProblems2) {
    await prismaClient.problem.create({ data: problem2 });
  }

  console.log("Seeding completed!");
};

main()
  .catch((e) => console.error("Error seeding database: ", e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });
