public class BestTimeToBuyAndSellStock {

    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            // update minPrice to the lowest so far
            if (price < minPrice) {
                minPrice = price;
            } 
            // check profit if sold today
            else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }

        return maxProfit;
    }

    public static void main(String[] args) {
        int[] prices = {7,1,5,3,6,4};
        System.out.println("Max Profit: " + maxProfit(prices)); // Output: 5
    }
}
